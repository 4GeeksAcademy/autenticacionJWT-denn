import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobanReducer from "../hooks/useGlobalReducer.jsx";
import { loginUser, registerUser } from "../services/backendServices.JS";

export const Home = () => {
	
	const {store, dispatch} = useGlobanReducer()
	const [user, setUser] = useState ({
		email: "",
		password:""
	})

	const [showLogin, setShowLogin] = useState(false)
	const [showRegister, setShowRegister] = useState(false)
	const navigate = useNavigate()

	const [regEmail, setRegEmail] = useState("")
	const [regPassword, setRegPassword] = useState("")
	const [regError, setRegError] = useState("")
	const [regLoading, setRegLoading] = useState(false)

	const [logError, setLogError] = useState("")
	const [logLoading, setLogLoading] = useState(false)

	const handleRegister = async (e) => {
		e.preventDefault()
		setRegError("")
		setRegLoading(true)
		try {
			await registerUser({ email: regEmail, password: regPassword })
			setShowRegister(false)
			setRegEmail("")
			setRegPassword("")
			setShowLogin(true)
		} catch (err) {
			setRegError(err.message)
		} finally {
			setRegLoading(false)
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		setLogError("")
		setLogLoading(true)
		try {
			const data = await loginUser({ email: user.email, password: user.password })
			sessionStorage.setItem("token", data.token)
			navigate("/demo")
		} catch (err) {
			setLogError(err.message)
		} finally {
			setLogLoading(false)
		}
	}
	const handelChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}




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
					onClick={() => { setShowRegister(true); setShowLogin(false) }}>
					Registrarse
				</button>
				<button
					className="btn btn-outline-dark btn-lg px-5"
					onClick={() => { setShowLogin(true); setShowRegister(false) }}>
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
						<h5 className="fw-bold mb-1">Iniciar sesión</h5>
						<p className="text-muted small mb-4">JWT by denn</p>
						
						
						<form onSubmit={handleLogin}>
							<div className="mb-3">
								<label className="form-label small fw-semibold">Email</label>
								<input
									type="email"
									name="email"
									placeholder="ingrese su email"
									className="form-control"
									value={user.email}
									onChange={handelChange}
									required
									autoFocus />
							</div>
							<div className="mb-3">
								<label className="form-label small fw-semibold">Contraseña</label>
								<input
									type="password"
									className="form-control"
									name="password"
									placeholder="ingrese su contraseña"
									value={user.password}
									onChange={handelChange}
									required />
							</div>
							{logError && <p className="text-danger small">{logError}</p>}
							<button
								type="submit"
								className="btn btn-dark w-100"
								disabled={logLoading}>
								{logLoading ? "Entrando..." : "Entrar"}
							</button>
						</form>
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
						<h5 className="fw-bold mb-1">Crear cuenta</h5>
						<p className="text-muted small mb-4">JWT by denn</p>
						<form onSubmit={handleRegister}>
							<div className="mb-3">
								<label className="form-label small fw-semibold">Email</label>
								<input
									type="email"
									className="form-control"
									value={regEmail}
									onChange={e => setRegEmail(e.target.value)}
									required
									autoFocus />
							</div>
							<div className="mb-3">
								<label className="form-label small fw-semibold">Contraseña</label>
								<input
									type="password"
									className="form-control"
									value={regPassword}
									onChange={e => setRegPassword(e.target.value)}
									required />
							</div>
							{regError && <p className="text-danger small">{regError}</p>}
							<button
								type="submit"
								className="btn btn-dark w-100"
								disabled={regLoading}>
								{regLoading ? "Creando cuenta..." : "Registrarse"}
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}