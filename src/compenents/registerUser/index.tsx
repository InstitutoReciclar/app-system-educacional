"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock, Briefcase } from "lucide-react"

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpar erro quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.role) {
      newErrors.role = "Função é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Aqui você implementaria a lógica de cadastro
      console.log("Dados do formulário:", formData)

      // Simular requisição
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Usuário cadastrado com sucesso!")

      // Resetar formulário
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      })
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error)
      alert("Erro ao cadastrar usuário. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    try {
      // Aqui você implementaria a integração com Google OAuth
      console.log("Iniciando cadastro com Google...")

      // Simular requisição
      await new Promise((resolve) => setTimeout(resolve, 1500))

      alert("Redirecionando para o Google...")
    } catch (error) {
      console.error("Erro ao conectar com Google:", error)
      alert("Erro ao conectar com Google. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-blue-100 text-sm">Preencha os dados abaixo para começar</p>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-left font-semibold text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }`}
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-left font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }`}
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-left font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }`}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Campo Função */}
            <div>
              <label htmlFor="role" className="block text-left font-semibold text-gray-700 mb-2">
                Função
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white ${
                    errors.role
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }`}
                  required
                >
                  <option value="">Selecione sua função</option>
                  <option value="admin">Administrador</option>
                  <option value="manager">Gerente</option>
                  <option value="employee">Funcionário</option>
                  <option value="intern">Estagiário</option>
                  <option value="freelancer">Freelancer</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </div>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Ou continue com</span>
            </div>
          </div>

          {/* Botão Google */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className={`w-full py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 bg-white transition-all duration-200 transform ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? "Conectando..." : "Cadastrar com Google"}
            </div>
          </button>

          {/* Link para Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Fazer login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Ao criar uma conta, você concorda com nossos{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  )
}
