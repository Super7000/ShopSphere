import dbConnect from "@/app/lib/db";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(request) {
    const req = await request.json();
    await dbConnect();

    try {
        const user = await User.findOne({ email: req.email });
        if (!user) return new Response(JSON.stringify({ message: 'Account not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const isMatch = await bcrypt.compare(req.password, user.password);
        if (!isMatch) return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });

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

            console.log(token)

        return new Response(JSON.stringify({ token }), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify(err), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
