import  mongoose, { Schema, model } from  "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  registered: boolean;
  role: 'admin' | 'coach';
}

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    validate: {
      validator: function (this: UserDocument, value: string) {
        if (this.registered) {
          return value != null && value.length > 0;
        }
        return true;
      },
      message: 'Please provide a password',
    },
    minlength: 6,
  },
  registered: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "coach"],
    required: function() {
      return this.registered;
    },
    default: "admin",
  },
},
{
  timestamps: true,
}
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export default User;