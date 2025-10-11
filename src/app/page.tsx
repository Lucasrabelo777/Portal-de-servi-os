export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          🚀 Projeto Reinicializado com Sucesso!
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          O projeto foi corrigido e está funcionando corretamente. 
          Agora você pode continuar desenvolvendo sem problemas.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            ✅ Status: Funcionando
          </h2>
          <p className="text-blue-700">
            O servidor Next.js está rodando na porta 3000
          </p>
        </div>
      </div>
    </div>
  )
}