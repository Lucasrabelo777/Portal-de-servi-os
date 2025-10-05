"use client"

import { useState } from 'react'
import { ArrowLeft, Copy, CheckCircle, Zap, Shield, Award, Gift, Heart, MessageCircle, CreditCard, Star } from 'lucide-react'
import Link from 'next/link'

// Dados dos gatilhos visuais
const triggersData = [
  {
    id: 1,
    name: 'Prestação da empresa',
    description: 'Demonstre a credibilidade e histórico da SIM7',
    icon: Shield,
    link: 'https://exemplo.com/prestacao-empresa-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 2,
    name: 'Gatilho de confiança',
    description: 'Construa confiança com depoimentos e certificações',
    icon: Award,
    link: 'https://exemplo.com/gatilho-confianca-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 3,
    name: 'Diferenciais da Sim7',
    description: 'Destaque os pontos únicos da empresa',
    icon: Star,
    link: 'https://exemplo.com/diferenciais-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 4,
    name: 'Cupom de primeira compra',
    description: 'Oferta especial para novos clientes',
    icon: Gift,
    link: 'https://exemplo.com/cupom-primeira-compra-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 5,
    name: 'Por que comprar com a Sim7',
    description: 'Razões convincentes para escolher a SIM7',
    icon: Heart,
    link: 'https://exemplo.com/por-que-comprar-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 6,
    name: 'Recomende no Reclame Aqui',
    description: 'Avaliações e reputação da empresa',
    icon: MessageCircle,
    link: 'https://exemplo.com/reclame-aqui-sim7',
    color: 'from-slate-100 to-slate-200'
  },
  {
    id: 7,
    name: 'Nosso Pix',
    description: 'Facilite o pagamento com Pix',
    icon: CreditCard,
    link: 'https://exemplo.com/pix-sim7',
    color: 'from-slate-100 to-slate-200'
  }
]

export default function BibliotecaGatilhos() {
  const [copiedTrigger, setCopiedTrigger] = useState('')

  const copyTriggerLink = (link, triggerId) => {
    navigator.clipboard.writeText(link)
    setCopiedTrigger(triggerId)
    setTimeout(() => setCopiedTrigger(''), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header com botão voltar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 pt-4 sm:pt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md mb-4 sm:mb-0"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="sm:ml-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Zap className="text-2xl sm:text-3xl md:text-4xl text-yellow-500" />
              Biblioteca de Gatilhos
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base mb-1">
              Gatilhos visuais para compartilhar com seus clientes e aumentar as vendas
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">{triggersData.length} gatilhos disponíveis</p>
          </div>
        </div>

        {/* Grid de Gatilhos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {triggersData.map((trigger) => {
            const IconComponent = trigger.icon
            return (
              <div
                key={trigger.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                {/* Barra colorida no topo mais sutil */}
                <div className={`h-2 bg-gradient-to-r ${trigger.color}`}></div>
                
                <div className="p-4 sm:p-5 md:p-6 text-center flex flex-col justify-between flex-1">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-4">
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto text-gray-500" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 leading-tight">{trigger.name}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-6 leading-relaxed">
                      {trigger.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyTriggerLink(trigger.link, trigger.id)}
                    className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                      copiedTrigger === trigger.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copiedTrigger === trigger.id ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                        Copiar Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Informações adicionais mais clean */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="text-center">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-yellow-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Como usar os gatilhos</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Clique em qualquer gatilho para copiar o link automaticamente. 
              Em seguida, compartilhe com seus clientes via WhatsApp, email ou outras plataformas.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-500">
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">📱 WhatsApp</span>
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">📧 Email</span>
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">💬 Telegram</span>
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">📱 Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}