import mongoose, { Schema, Document, models, model } from "mongoose";

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin"; // Role-based access
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Export the model
export default models.User || model<IUser>("User", UserSchema);
