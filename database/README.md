## MongoDB Atlas Setup Guide

Follow these steps to set up MongoDB Atlas for your Campus Club Management Suite:

### 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account
2. Create a new organization if prompted

### 2. Create a New Project

1. Name your project (e.g., "Campus Club Management")
2. Click "Create Project"

### 3. Create a Cluster

1. Select "Shared" (free tier)
2. Choose a cloud provider (AWS, Google Cloud, or Azure) and a region closest to your users
3. Keep the default cluster tier (M0 Sandbox)
4. Name your cluster (e.g., "campus-club-cluster")
5. Click "Create Cluster"

### 4. Configure Database Access

1. In the left sidebar, click "Database Access" under Security
2. Click "Add New Database User"
3. Create a username and password (store this securely, you'll need it for your connection string)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### 5. Configure Network Access

1. In the left sidebar, click "Network Access" under Security
2. Click "Add IP Address"
3. For development, you can select "Allow Access From Anywhere" (not recommended for production)
4. Click "Confirm"

### 6. Get Connection String

1. Go back to the Clusters page and click "Connect"
2. Select "Connect your application"
3. Select "Node.js" as the driver and the appropriate version
4. Copy the connection string
5. Replace `<password>` with your database user's password
6. Replace `<dbname>` with `campus-club-suite`

### 7. Update Your .env File

In your backend `.env` file, update the `MONGODB_URI` value with your connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/campus-club-suite?retryWrites=true&w=majority
```

### 8. Seed the Database

Run the seeder script to populate your MongoDB Atlas database:

```bash
cd backend
node seedDatabase.js
```

### 9. Test the Connection

Start your backend server and verify that it connects to MongoDB Atlas: