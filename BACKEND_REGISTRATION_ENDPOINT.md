# Backend Registration Endpoint

Add this endpoint to your backend API server.

## Required Dependencies

```bash
npm install @keycloak/keycloak-admin-client
```

## Environment Variables

Add to your backend `.env`:

```
KEYCLOAK_URL=https://auth.kneo.io/
KEYCLOAK_REALM=semantyca
KEYCLOAK_CLIENT_ID=admin-cli
KEYCLOAK_CLIENT_SECRET=<your-admin-client-secret>
```

## Setup Keycloak Admin Client

Get admin client credentials from Keycloak:
1. Go to your Keycloak admin console
2. Select realm "semantyca"
3. Go to Clients -> Create new client (or use existing admin-cli)
4. Enable "Service accounts enabled"
5. In Service Account Roles tab, assign "manage-users" role from realm-management

## Registration Endpoint Code

```typescript
import KcAdminClient from '@keycloak/keycloak-admin-client';

const kcAdminClient = new KcAdminClient({
  baseUrl: process.env.KEYCLOAK_URL,
  realmName: process.env.KEYCLOAK_REALM
});

async function authenticateAdmin() {
  await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: process.env.KEYCLOAK_CLIENT_ID!,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!
  });
}

app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        type: 'validation-error',
        title: 'Validation Error',
        status: 400,
        detail: 'Username, email, and password are required',
        errors: {
          username: !username ? ['Username is required'] : [],
          email: !email ? ['Email is required'] : [],
          password: !password ? ['Password is required'] : []
        }
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        type: 'validation-error',
        title: 'Validation Error',
        status: 400,
        detail: 'Password must be at least 8 characters',
        errors: {
          password: ['Password must be at least 8 characters']
        }
      });
    }

    await authenticateAdmin();

    const user = await kcAdminClient.users.create({
      realm: process.env.KEYCLOAK_REALM!,
      username,
      email,
      enabled: true,
      emailVerified: false,
      credentials: [{
        type: 'password',
        value: password,
        temporary: false
      }]
    });

    res.status(201).json({
      success: true,
      userId: user.id
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.response?.status === 409) {
      return res.status(409).json({
        type: 'conflict',
        title: 'User Already Exists',
        status: 409,
        detail: 'Username or email already exists',
        errors: {
          username: ['Username or email already exists']
        }
      });
    }

    res.status(500).json({
      type: 'server-error',
      title: 'Registration Failed',
      status: 500,
      detail: error.message || 'Failed to create user'
    });
  }
});
```

## Testing

Test with curl:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```
