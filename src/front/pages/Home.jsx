import React, { useState } from "react"
import { Login } from "../components/Login.jsx";
import { Register } from "../components/Register.jsx";

export const Home = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	return (
		<div className="min-vh-100 d-flex align-items-center justify-content-center flex-column flex-md-row px-4 px-md-5 py-5 py-md-0 gap-5">
			<div className="text-md-start text-center order-1 order-md-1">
				<h1 className="display-4 fw-bold lh-1 mb-2">
					Sistema de<br />autenticación
				</h1>
				<p className="fs-5 text-muted fw-light mb-0">JWT by denn</p>
			</div>

			<div className="d-flex flex-column gap-3 order-2 order-md-2">
				<button
					className="btn btn-dark btn-lg px-5"
					onClick={() => { setShowRegister(true); setShowLogin(false); }}>
					Registrarse
				</button>
				<button
					className="btn btn-outline-dark btn-lg px-5"
					onClick={() => { setShowLogin(true); setShowRegister(false); }}>
					Iniciar sesión
				</button>
			</div>

			{showLogin && (
				<div
					className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
					style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
					onClick={() => setShowLogin(false)}>
					<div
						className="bg-white rounded-3 p-4 p-md-5 position-relative"
						style={{ width: "100%", maxWidth: "400px" }}
						onClick={e => e.stopPropagation()}>
						<button
							className="btn-close position-absolute top-0 end-0 m-3"
							onClick={() => setShowLogin(false)} />
						<Login />
					</div>
				</div>
			)}

			{showRegister && (
				<div
					className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
					style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
					onClick={() => setShowRegister(false)}>
					<div
						className="bg-white rounded-3 p-4 p-md-5 position-relative"
						style={{ width: "100%", maxWidth: "400px" }}
						onClick={e => e.stopPropagation()}>
						<button
							className="btn-close position-absolute top-0 end-0 m-3"
							onClick={() => setShowRegister(false)} />
						<Register />
					</div>
				</div>
			)}
		</div>
	);
};