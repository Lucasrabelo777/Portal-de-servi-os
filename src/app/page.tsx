"use client"

import { useState } from 'react'
import { TrendingUp, Zap, Shield, Award, Star, Gift, Heart, MessageCircle, CreditCard } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Bem-vindo ao
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Futuro Digital
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Uma experiência moderna e inovadora que conecta você ao que há de mais avançado em tecnologia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Começar Agora
              </button>
              <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Usuários Ativos', icon: TrendingUp },
              { number: '99.9%', label: 'Uptime', icon: Zap },
              { number: '24/7', label: 'Suporte', icon: Shield },
              { number: '5★', label: 'Avaliação', icon: Award }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Recursos Incríveis
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra funcionalidades que vão transformar sua experiência digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Interface Moderna',
                description: 'Design futurista e intuitivo que se adapta às suas necessidades',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Gift,
                title: 'Recursos Exclusivos',
                description: 'Funcionalidades únicas que você não encontra em nenhum outro lugar',
                color: 'from-green-400 to-blue-500'
              },
              {
                icon: Heart,
                title: 'Experiência Personalizada',
                description: 'Cada detalhe pensado para oferecer a melhor experiência possível',
                color: 'from-pink-400 to-purple-500'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 transform group-hover:scale-105 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a milhares de usuários que já descobriram o futuro
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Começar Gratuitamente
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Projeto Moderno. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}