export const loginUser = async (user) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg || "Email o contraseña incorrectos");
    return data;
    
};

export const getProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) return null;
    return await response.json();
};

export const registerUser = async (user) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Error al registrarse");
    }
    return data;
};
