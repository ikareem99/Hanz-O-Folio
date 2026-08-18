# Admin REST API Documentation

This project exposes a dynamic, secured REST API under the `/api/v1/` prefix to allow external applications (like Postman, mobile apps, or Python scripts) to manage the portfolio's content.

## Authentication

All API routes are protected. You must include an `Authorization` header with a valid API key in every request. 

The API key must be defined in your `.env.local` file as `ADMIN_API_KEY`.

**Header Format:**
```
Authorization: Bearer YOUR_API_KEY_HERE
```

If the key is missing or invalid, the API will return a `401 Unauthorized` response.

---

## Supported Collections

The API dynamically maps the URL to the underlying MongoDB collections. Replace `[collection]` in the endpoints below with any of the following:

- `projects`
- `posts`
- `experience`
- `tools`
- `messages`

---

## Endpoints

### 1. Get All Items
Retrieve a list of all items in a specific collection, sorted by newest first.

- **Method**: `GET`
- **URL**: `/api/v1/[collection]`
- **Example**: `/api/v1/projects`

**cURL Example**:
```bash
curl -X GET http://localhost:3000/api/v1/projects \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

### 2. Create a New Item
Create a new document in the specified collection.

- **Method**: `POST`
- **URL**: `/api/v1/[collection]`
- **Body**: JSON object matching the schema

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "My New Blog Post",
        "slug": "my-new-blog-post",
        "content": "<h2>Hello World</h2>"
      }'
```

### 3. Get a Single Item
Retrieve a single document by its MongoDB `_id`.

- **Method**: `GET`
- **URL**: `/api/v1/[collection]/[id]`
- **Example**: `/api/v1/projects/64a1b2c3d4e5f...`

**cURL Example**:
```bash
curl -X GET http://localhost:3000/api/v1/projects/64a1b2c3d4e5f... \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

### 4. Update an Item
Update an existing document. You only need to send the fields you want to change.

- **Method**: `PUT`
- **URL**: `/api/v1/[collection]/[id]`
- **Body**: JSON object with fields to update

**cURL Example**:
```bash
curl -X PUT http://localhost:3000/api/v1/tools/64a1b2c3d4e5f... \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Tool Name"}'
```

### 5. Delete an Item
Permanently remove a document from the database.

- **Method**: `DELETE`
- **URL**: `/api/v1/[collection]/[id]`

**cURL Example**:
```bash
curl -X DELETE http://localhost:3000/api/v1/messages/64a1b2c3d4e5f... \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

---

## Response Format

All API responses follow a standard JSON structure.

**Success Response (200 / 201):**
```json
{
  "success": true,
  "data": { ... } // Or an array of objects
}
```

**Error Response (400 / 401 / 404 / 500):**
```json
{
  "success": false,
  "error": "Error message description"
}
```
