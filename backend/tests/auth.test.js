const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // You need to export app from server.js
const User = require('../models/User');

let mongoServer;

// --- Test Setup ---
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Clear database between tests
afterEach(async () => {
    await User.deleteMany();
});

// --- Unit Tests ---
describe('Auth Endpoints', () => {

    // Test 1: Successful User Registration
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    // Test 2: Prevent Duplicate Emails
    it('should not register a user with an existing email', async () => {
        // Create first user
        await User.create({
            name: 'User One',
            email: 'duplicate@example.com',
            password: 'password123'
        });

        // Try to create second user with same email
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'User Two',
                email: 'duplicate@example.com',
                password: 'password456'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.msg).toEqual('User already exists');
    });

    // Test 3: Successful Login
    it('should login an existing user and return a token', async () => {
        // Create user manually
        const user = new User({
            name: 'Login User',
            email: 'login@example.com',
            password: 'password123'
        });
        await user.save();

        // Attempt login
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // Test 4: Fail Login with Wrong Password
    it('should reject login with incorrect password', async () => {
        const user = new User({
            name: 'Wrong Pass User',
            email: 'wrong@example.com',
            password: 'password123'
        });
        await user.save();

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@example.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.msg).toEqual('Invalid credentials');
    });

    // Test 5: Protected Route Access Control
    it('should deny access to protected route without token', async () => {
        const res = await request(app).get('/api/auth/me');

        expect(res.statusCode).toEqual(401);
        expect(res.body.msg).toMatch(/Not authorized/);
    });

});