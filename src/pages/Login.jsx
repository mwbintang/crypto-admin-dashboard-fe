import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import Card from "../components/Card";
import Form from "../components/Form";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/usersService";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            setAlert({ message: "Please fill all fields", type: "error" });
            return;
        }

        try {
            // Call loginService with form data
            const loginResp = await loginService({
                username: form.username,
                password: form.password,
            });

            // Assuming loginResp contains a token
            if (loginResp && loginResp.token) {
                localStorage.setItem("token", loginResp.token);
                setAlert({ message: "Login successful!", type: "success" });

                // Redirect after a short delay
                setTimeout(() => navigate("/dashboard"), 1200);
            } else {
                setAlert({ message: "Invalid username or password", type: "error" });
            }
        } catch (err) {
            // Catch API errors
            setAlert({ message: err.message || "Login failed", type: "error" });
        }
    };

    const formFields = [
        {
            label: "Username",
            name: "username",
            type: "text",
            placeholder: "Enter username",
            value: form.username,
            icon: User,
            required: true,
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter password",
            value: form.password,
            icon: Lock,
            required: true,
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            <Card className="w-full max-w-md p-6 text-center">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-600 text-white rounded-full p-3 mb-3 shadow-md">
                        <Lock size={28} />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Admin Login
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Please enter your credentials
                    </p>
                </div>

                <Form
                    fields={formFields}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200 font-medium mt-10 pt-8"
                >
                    Log In
                </Button>
            </Card>
        </div>
    );
};

export default LoginPage;
