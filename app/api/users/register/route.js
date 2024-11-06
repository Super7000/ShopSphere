import dbConnect from "@/app/lib/db";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(request) {
    const req = await request.json();
    await dbConnect();

    try {
        let user = await User.findOne({ email: req.email });
        if (user)
            return new Response(JSON.stringify({ message: 'User already exists' }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });

        user = new User({
            username: req.username,
            email: req.email,
            password: req.password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin
            }
        };

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        return new Response(JSON.stringify({ token }), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error(err.message);
        return new Response(JSON.stringify(err), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
