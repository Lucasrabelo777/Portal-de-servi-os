"use client"

import { useState, useMemo } from 'react'
import { Search, ArrowLeft, MapPin, Clock, Users, DollarSign, Copy, CheckCircle, XCircle, FileText, Image, Video, Globe, ChevronDown, ChevronUp, Calendar, Star, TrendingUp, Zap, Shield, Award, Gift, Heart, MessageCircle, CreditCard, Filter, X, Home, Bed, Package, Bell } from 'lucide-react'

// Type definitions
type Product = {
  id: number;
  name: string;
  price: string;
  costPrice: string;
  netValue: string;
  description: string;
  duration: string;
  people: string;
  includes: string[];
  notIncludes: string[];
  serviceDescription: string;
  aboutService: string;
  highlights: string[];
  importantNotes: string[];
  rules: string[];
  agenda: string;
  availableDays: string[];
  specialistLibrary: {
    pdf: string;
    banner1: string;
    banner2: string;
    video1: string;
    bannerEnglish: string;
    bannerSpanish: string;
  };
  pricingDetails?: {
    seasons: any;
    accommodationTypes: any;
    occupancy: any;
  };
};

type CategoryKey = string;

// Cores específicas solicitadas para cada categoria
const categoryColors = {
  'pacotes-jericoacoara': 'from-blue-400 to-blue-500',
  'pacotes-fortaleza-jericoacoara': 'from-yellow-400 to-yellow-500',
  'pacotes-fortaleza': 'from-orange-400 to-orange-500',
  'servicos-regulares': 'from-green-400 to-green-500',
  'ingressos-atividades': 'from-purple-400 to-purple-500',
  'transfers-privativos': 'from-pink-400 to-pink-500',
  'passeios-privativos': 'from-amber-600 to-amber-700',
  'apenas-hospedagens': 'from-teal-400 to-teal-500',
  'outros': 'from-gray-400 to-gray-500'
}

// Descrições das categorias
const categoryDescriptions = {
  'pacotes-jericoacoara': 'Hospedagem + transfer e muito mais',
  'pacotes-fortaleza-jericoacoara': 'Combine os melhores destinos do Ceará',
  'pacotes-fortaleza': 'Conheça a capital cearense com conforto',
  'servicos-regulares': 'Transporte compartilhado econômico',
  'ingressos-atividades': 'Diversão garantida para toda família',
  'transfers-privativos': 'Conforto e exclusividade no transporte',
  'passeios-privativos': 'Experiências únicas e personalizadas',
  'apenas-hospedagens': 'Acomodações selecionadas para sua estadia',
  'outros': 'Serviços especiais e personalizados'
}

// Descrições detalhadas das páginas de categoria
const categoryPageDescriptions = {
  'pacotes-jericoacoara': 'Aqui você encontra pacotes para Jericoacoara com hospedagens, transfers e passeios.',
  'pacotes-fortaleza-jericoacoara': 'Aqui você encontra pacotes combinados entre Fortaleza e Jericoacoara com hospedagens, transfers e passeios.',
  'pacotes-fortaleza': 'Aqui você encontra pacotes para Fortaleza com hospedagens, transfers e city tours.',
  'servicos-regulares': 'Aqui você encontra serviços de transporte compartilhado com saídas regulares.',
  'ingressos-atividades': 'Aqui você encontra ingressos para parques, atividades e experiências únicas.',
  'transfers-privativos': 'Aqui você encontra serviços de transporte exclusivo e personalizado.',
  'passeios-privativos': 'Aqui você encontra passeios exclusivos com guias especializados e roteiros personalizados.',
  'apenas-hospedagens': 'Aqui você encontra apenas opções de hospedagem sem outros serviços inclusos.',
  'outros': 'Aqui você encontra serviços especiais que não se encaixam nas outras categorias.'
}

// Categorias que têm pacotes (para mostrar detalhes de precificação)
const packageCategories = ['pacotes-jericoacoara', 'pacotes-fortaleza-jericoacoara', 'pacotes-fortaleza']

// Dados das notificações
const notificationsData = [
  {
    id: 1,
    title: '🎉 Promoção Especial Jericoacoara',
    message: 'Pacotes para Jericoacoara com 20% de desconto até o final do mês! Aproveite esta oportunidade única.',
    date: '2024-01-15',
    type: 'promotion',
    isNew: true
  },
  {
    id: 2,
    title: '🆕 Novo Serviço Disponível',
    message: 'Agora oferecemos consultoria turística personalizada para seus clientes. Confira na categoria "Outros".',
    date: '2024-01-14',
    type: 'new-service',
    isNew: true
  },
  {
    id: 3,
    title: '📱 Biblioteca de Gatilhos',
    message: 'Use nossa biblioteca de gatilhos para aumentar suas vendas! Acesse através do menu principal.',
    date: '2024-01-13',
    type: 'tip',
    isNew: false
  },
  {
    id: 4,
    title: '🏨 Novas Hospedagens',
    message: 'Adicionamos novas opções de hospedagem em Fortaleza e Jericoacoara com preços especiais.',
    date: '2024-01-12',
    type: 'update',
    isNew: false
  },
  {
    id: 5,
    title: '💳 Facilite o Pagamento',
    message: 'Lembre-se de usar nosso Pix para facilitar o pagamento dos seus clientes. Link disponível nos gatilhos.',
    date: '2024-01-11',
    type: 'reminder',
    isNew: false
  }
]

// Dados dos gatilhos visuais
const triggersData = [
  {
    id: 1,
    name: 'Prestação da empresa',
    description: 'Demonstre a credibilidade e histórico da SIM7',
    icon: Shield,
    link: 'https://exemplo.com/prestacao-empresa-sim7',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Gatilho de confiança',
    description: 'Construa confiança com depoimentos e certificações',
    icon: Award,
    link: 'https://exemplo.com/gatilho-confianca-sim7',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    name: 'Diferenciais da Sim7',
    description: 'Destaque os pontos únicos da empresa',
    icon: Star,
    link: 'https://exemplo.com/diferenciais-sim7',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    name: 'Cupom de primeira compra',
    description: 'Oferta especial para novos clientes',
    icon: Gift,
    link: 'https://exemplo.com/cupom-primeira-compra-sim7',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    name: 'Por que comprar com a Sim7',
    description: 'Razões convincentes para escolher a SIM7',
    icon: Heart,
    link: 'https://exemplo.com/por-que-comprar-sim7',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 6,
    name: 'Recomende no Reclame Aqui',
    description: 'Avaliações e reputação da empresa',
    icon: MessageCircle,
    link: 'https://exemplo.com/reclame-aqui-sim7',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 7,
    name: 'Nosso Pix',
    description: 'Facilite o pagamento com Pix',
    icon: CreditCard,
    link: 'https://exemplo.com/pix-sim7',
    color: 'from-teal-500 to-teal-600'
  }
]

// Dados mock dos serviços expandidos
const categoriesData = {
  'pacotes-jericoacoara': {
    name: 'Pacotes Jericoacoara',
    icon: '🏖️',
    products: [
      {
        id: 1,
        name: 'Jericoacoara 3 dias / 2 noites',
        price: 'R$ 850,00',
        costPrice: 'R$ 680,00',
        netValue: 'R$ 170,00',
        description: 'Pacote completo com hospedagem em pousada, café da manhã e transfer',
        duration: '3 dias',
        people: '2 pessoas',
        includes: ['Hospedagem', 'Café da manhã', 'Transfer ida/volta'],
        notIncludes: ['Almoço e jantar', 'Passeios opcionais', 'Bebidas alcoólicas', 'Seguro viagem'],
        serviceDescription: 'Este pacote foi desenvolvido para quem deseja conhecer as belezas de Jericoacoara com conforto e praticidade. Inclui hospedagem em pousada bem localizada, café da manhã diário e transfer confortável. Nossa equipe selecionou cuidadosamente as melhores opções de hospedagem na região, garantindo que você tenha uma experiência inesquecível em um dos destinos mais procurados do Brasil. O pacote oferece a combinação perfeita entre aventura e relaxamento, permitindo que você explore as dunas, praias paradisíacas e o famoso pôr do sol de Jericoacoara.',
        aboutService: 'Pacote ideal para casais ou amigos que buscam uma experiência autêntica em Jeri. Nossa equipe selecionou cuidadosamente as melhores pousadas da região, garantindo localização privilegiada e atendimento de qualidade. Jericoacoara é um destino único que combina belezas naturais exuberantes com uma atmosfera descontraída e acolhedora. Este pacote foi pensado para proporcionar momentos únicos, desde o nascer do sol nas dunas até as noites estreladas na vila. Trabalhamos apenas com parceiros locais que compartilham nossos valores de sustentabilidade e respeito à cultura local.',
        highlights: ['Pousada no centro de Jeri', 'Transfer em veículo 4x4', 'Café da manhã regional', 'Suporte 24h'],
        importantNotes: ['Check-in a partir das 14h', 'Check-out até 12h', 'Documentos obrigatórios', 'Confirmação 48h antes'],
        rules: ['Não é permitido fumar nos quartos', 'Animais não são permitidos', 'Respeitar horário de silêncio (22h às 7h)', 'Danos serão cobrados à parte'],
        agenda: 'Dia 1: Chegada em Jericoacoara, check-in na pousada e tempo livre para conhecer a vila. Dia 2: Manhã livre para relaxar na praia, tarde com passeio opcional pelas dunas e pôr do sol na Duna do Pôr do Sol. Dia 3: Café da manhã, check-out e transfer de retorno.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/jeri-3dias-detalhes.pdf',
          banner1: 'https://exemplo.com/banner-jeri-promocional.jpg',
          banner2: 'https://exemplo.com/banner-jeri-hospedagem.jpg',
          video1: 'https://exemplo.com/video-jeri-experiencia.mp4',
          bannerEnglish: 'https://exemplo.com/banner-jeri-english.jpg',
          bannerSpanish: 'https://exemplo.com/banner-jeri-spanish.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.4 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 850 },
            superior: { name: 'Superior', basePrice: 1200 },
            luxury: { name: 'Luxo', basePrice: 1800 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      },
      {
        id: 2,
        name: 'Jericoacoara 5 dias / 4 noites',
        price: 'R$ 1.450,00',
        costPrice: 'R$ 1.160,00',
        netValue: 'R$ 290,00',
        description: 'Pacote estendido com mais tempo para aproveitar as belezas de Jeri',
        duration: '5 dias',
        people: '2 pessoas',
        includes: ['Hospedagem', 'Café da manhã', 'Transfer ida/volta', 'Passeio de buggy'],
        notIncludes: ['Almoço e jantar', 'Bebidas alcoólicas', 'Passeios extras', 'Seguro viagem'],
        serviceDescription: 'Pacote completo para quem quer explorar Jericoacoara com mais calma e aproveitar todas as atrações da região.',
        aboutService: 'Com 5 dias em Jeri, você terá tempo suficiente para conhecer as principais atrações, relaxar nas praias paradisíacas e vivenciar a cultura local.',
        highlights: ['Passeio de buggy incluso', 'Mais tempo para relaxar', 'Hospedagem premium', 'Roteiro flexível'],
        importantNotes: ['Passeio de buggy sujeito às condições climáticas', 'Recomendado protetor solar', 'Levar roupas leves'],
        rules: ['Respeitar meio ambiente', 'Não alimentar animais silvestres', 'Seguir orientações do guia'],
        agenda: 'Dia 1: Chegada e acomodação. Dia 2: Passeio de buggy pelas praias e lagoas. Dia 3: Visita à Pedra Furada e relaxamento na praia. Dia 4: Passeio opcional aos Lençóis Maranhenses ou tempo livre. Dia 5: Check-out e retorno.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/jeri-5dias-completo.pdf',
          banner1: 'https://exemplo.com/banner-jeri-5dias.jpg',
          banner2: 'https://exemplo.com/banner-buggy-jeri.jpg',
          video1: 'https://exemplo.com/video-jeri-5dias.mp4',
          bannerEnglish: 'https://exemplo.com/banner-jeri-5days-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-jeri-5dias-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.4 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 1450 },
            superior: { name: 'Superior', basePrice: 2100 },
            luxury: { name: 'Luxo', basePrice: 3200 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      },
      {
        id: 3,
        name: 'Jericoacoara Luxo 4 dias / 3 noites',
        price: 'R$ 2.200,00',
        costPrice: 'R$ 1.760,00',
        netValue: 'R$ 440,00',
        description: 'Experiência premium com hospedagem em resort e serviços exclusivos',
        duration: '4 dias',
        people: '2 pessoas',
        includes: ['Resort 5 estrelas', 'Todas as refeições', 'Transfer privativo', 'Spa'],
        notIncludes: ['Bebidas premium', 'Tratamentos spa extras', 'Passeios aéreos', 'Compras pessoais'],
        serviceDescription: 'A experiência mais luxuosa em Jericoacoara, com hospedagem em resort 5 estrelas e serviços exclusivos.',
        aboutService: 'Para quem busca o máximo em conforto e exclusividade. Resort com vista para o mar, spa completo e gastronomia de alto nível.',
        highlights: ['Resort 5 estrelas', 'Vista para o mar', 'Spa incluso', 'Gastronomia premium', 'Transfer privativo'],
        importantNotes: ['Dress code no restaurante principal', 'Reservas no spa com antecedência', 'Transfer privativo em horário flexível'],
        rules: ['Traje adequado nas áreas sociais', 'Reservas de restaurante obrigatórias', 'Respeitar outros hóspedes'],
        agenda: 'Dia 1: Transfer privativo e check-in no resort, welcome drink e jantar gourmet. Dia 2: Spa pela manhã, almoço no resort e tarde livre na praia privativa. Dia 3: Passeio exclusivo de catamarã e jantar especial. Dia 4: Check-out e transfer de retorno.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/jeri-luxo-detalhes.pdf',
          banner1: 'https://exemplo.com/banner-jeri-luxo.jpg',
          banner2: 'https://exemplo.com/banner-resort-jeri.jpg',
          video1: 'https://exemplo.com/video-jeri-luxo.mp4',
          bannerEnglish: 'https://exemplo.com/banner-jeri-luxury-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-jeri-lujo-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.4 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 2200 },
            superior: { name: 'Superior', basePrice: 3100 },
            luxury: { name: 'Luxo', basePrice: 4500 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      }
    ]
  },
  'pacotes-fortaleza-jericoacoara': {
    name: 'Pacotes Fortaleza x Jericoacoara',
    icon: '🌊',
    products: [
      {
        id: 4,
        name: 'Fortaleza + Jeri 6 dias / 5 noites',
        price: 'R$ 1.680,00',
        costPrice: 'R$ 1.344,00',
        netValue: 'R$ 336,00',
        description: 'Combine o melhor de Fortaleza com as belezas de Jericoacoara',
        duration: '6 dias',
        people: '2 pessoas',
        includes: ['Hospedagem em ambos destinos', 'Café da manhã', 'Transfers', 'City tour Fortaleza'],
        notIncludes: ['Almoços e jantares', 'Passeios opcionais em Jeri', 'Bebidas', 'Seguro viagem'],
        serviceDescription: 'Roteiro completo combinando a capital cearense com o paraíso de Jericoacoara.',
        aboutService: 'Perfeito para quem quer conhecer dois destinos incríveis em uma única viagem. Fortaleza com sua vida urbana e Jeri com suas belezas naturais.',
        highlights: ['Dois destinos em um', 'City tour em Fortaleza', 'Hospedagens selecionadas', 'Transfers inclusos'],
        importantNotes: ['Bagagem limitada para Jeri', 'Transfer para Jeri em veículo 4x4', 'Documentos necessários'],
        rules: ['Horários de transfer fixos', 'Bagagem máxima 15kg para Jeri', 'Check-in conforme disponibilidade'],
        agenda: 'Dias 1-2: Fortaleza - City tour, praias urbanas e vida noturna. Dia 3: Transfer para Jericoacoara. Dias 4-5: Jericoacoara - praias, dunas e pôr do sol. Dia 6: Retorno para Fortaleza e partida.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/fortaleza-jeri-roteiro.pdf',
          banner1: 'https://exemplo.com/banner-fortaleza-jeri.jpg',
          banner2: 'https://exemplo.com/banner-dois-destinos.jpg',
          video1: 'https://exemplo.com/video-fortaleza-jeri.mp4',
          bannerEnglish: 'https://exemplo.com/banner-fortaleza-jeri-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-fortaleza-jeri-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.4 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 1680 },
            superior: { name: 'Superior', basePrice: 2400 },
            luxury: { name: 'Luxo', basePrice: 3600 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      },
      {
        id: 5,
        name: 'Roteiro Completo 8 dias / 7 noites',
        price: 'R$ 2.850,00',
        costPrice: 'R$ 2.280,00',
        netValue: 'R$ 570,00',
        description: 'Experiência completa pelos principais destinos do Ceará',
        duration: '8 dias',
        people: '2 pessoas',
        includes: ['Hospedagem premium', 'Todas as refeições', 'Transfers privativos', 'Passeios inclusos'],
        notIncludes: ['Bebidas alcoólicas', 'Compras pessoais', 'Seguro viagem', 'Gorjetas'],
        serviceDescription: 'O roteiro mais completo do Ceará, incluindo Fortaleza, Jericoacoara e outros destinos imperdíveis.',
        aboutService: 'Para viajantes que querem uma experiência completa e sem preocupações. Tudo incluído com o melhor que o Ceará oferece.',
        highlights: ['Roteiro completo', 'Tudo incluído', 'Transfers privativos', 'Guias especializados', 'Hospedagens premium'],
        importantNotes: ['Roteiro sujeito a condições climáticas', 'Documentos obrigatórios', 'Seguro viagem recomendado'],
        rules: ['Seguir cronograma estabelecido', 'Respeitar horários dos passeios', 'Cuidar do meio ambiente'],
        agenda: 'Dias 1-2: Fortaleza - City tour completo e praias. Dias 3-5: Jericoacoara - dunas, lagoas e praias. Dias 6-7: Canoa Quebrada - falésias e cultura local. Dia 8: Retorno e despedida.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/roteiro-completo-ceara.pdf',
          banner1: 'https://exemplo.com/banner-roteiro-completo.jpg',
          banner2: 'https://exemplo.com/banner-ceara-completo.jpg',
          video1: 'https://exemplo.com/video-ceara-completo.mp4',
          bannerEnglish: 'https://exemplo.com/banner-complete-route-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-ruta-completa-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.4 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 2850 },
            superior: { name: 'Superior', basePrice: 4100 },
            luxury: { name: 'Luxo', basePrice: 6200 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      }
    ]
  },
  'pacotes-fortaleza': {
    name: 'Pacotes Fortaleza',
    icon: '🏙️',
    products: [
      {
        id: 6,
        name: 'Fortaleza 3 dias / 2 noites',
        price: 'R$ 650,00',
        costPrice: 'R$ 520,00',
        netValue: 'R$ 130,00',
        description: 'Conheça os principais pontos turísticos da capital cearense',
        duration: '3 dias',
        people: '2 pessoas',
        includes: ['Hospedagem centro', 'Café da manhã', 'City tour', 'Transfer aeroporto'],
        notIncludes: ['Almoços e jantares', 'Ingressos para atrações pagas', 'Transporte local extra', 'Bebidas'],
        serviceDescription: 'Pacote ideal para conhecer Fortaleza em um final de semana prolongado.',
        aboutService: 'Fortaleza oferece praias urbanas, vida noturna agitada, gastronomia típica e rica cultura nordestina.',
        highlights: ['Hospedagem no centro', 'City tour incluso', 'Praias urbanas', 'Cultura local'],
        importantNotes: ['City tour sujeito a condições climáticas', 'Levar protetor solar', 'Documentos obrigatórios'],
        rules: ['Respeitar horários do city tour', 'Não é permitido fumar no veículo', 'Seguir orientações do guia'],
        agenda: 'Dia 1: Chegada, check-in e city tour pelos principais pontos turísticos. Dia 2: Manhã nas praias urbanas, tarde no Mercado Central e noite livre. Dia 3: Check-out e transfer para aeroporto.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/fortaleza-3dias.pdf',
          banner1: 'https://exemplo.com/banner-fortaleza-city.jpg',
          banner2: 'https://exemplo.com/banner-fortaleza-praias.jpg',
          video1: 'https://exemplo.com/video-fortaleza-tour.mp4',
          bannerEnglish: 'https://exemplo.com/banner-fortaleza-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-fortaleza-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.3 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 650 },
            superior: { name: 'Superior', basePrice: 950 },
            luxury: { name: 'Luxo', basePrice: 1400 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.5 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      },
      {
        id: 7,
        name: 'Fortaleza Praia 4 dias / 3 noites',
        price: 'R$ 980,00',
        costPrice: 'R$ 784,00',
        netValue: 'R$ 196,00',
        description: 'Foque nas belas praias de Fortaleza e região metropolitana',
        duration: '4 dias',
        people: '2 pessoas',
        includes: ['Hospedagem beira-mar', 'Café da manhã', 'Passeio praias', 'Transfer'],
        notIncludes: ['Refeições extras', 'Bebidas alcoólicas', 'Atividades aquáticas', 'Compras'],
        serviceDescription: 'Para quem quer focar nas belíssimas praias da região metropolitana de Fortaleza.',
        aboutService: 'Hospedagem na beira-mar com fácil acesso às melhores praias da região. Ideal para relaxar e curtir o sol.',
        highlights: ['Hospedagem beira-mar', 'Acesso direto à praia', 'Passeio pelas praias', 'Localização privilegiada'],
        importantNotes: ['Protetor solar obrigatório', 'Cuidado com exposição solar', 'Hidratação constante'],
        rules: ['Respeitar meio ambiente marinho', 'Não deixar lixo na praia', 'Cuidado com pertences'],
        agenda: 'Dia 1: Chegada e acomodação na beira-mar. Dia 2: Passeio pelas praias de Iracema e Meireles. Dia 3: Visita às praias do Futuro e Sabiaguaba. Dia 4: Manhã livre na praia e partida.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/fortaleza-praias.pdf',
          banner1: 'https://exemplo.com/banner-fortaleza-beach.jpg',
          banner2: 'https://exemplo.com/banner-praias-ceara.jpg',
          video1: 'https://exemplo.com/video-praias-fortaleza.mp4',
          bannerEnglish: 'https://exemplo.com/banner-fortaleza-beach-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-fortaleza-playa-es.jpg'
        },
        pricingDetails: {
          seasons: {
            high: { 
              period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'], 
              multiplier: 1.3 
            },
            low: { 
              period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'], 
              multiplier: 1.0 
            }
          },
          accommodationTypes: {
            standard: { name: 'Padrão', basePrice: 980 },
            superior: { name: 'Superior', basePrice: 1450 },
            luxury: { name: 'Luxo', basePrice: 2100 }
          },
          occupancy: {
            single: { name: 'Single (1 pessoa)', multiplier: 1.5 },
            double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
          }
        }
      }
    ]
  },
  'servicos-regulares': {
    name: 'Serviços Regulares',
    icon: '🚌',
    products: [
      {
        id: 8,
        name: 'Transfer Aeroporto - Centro',
        price: 'R$ 45,00',
        costPrice: 'R$ 32,00',
        netValue: 'R$ 13,00',
        description: 'Transporte regular do aeroporto para região central',
        duration: '45 min',
        people: 'Por pessoa',
        includes: ['Transporte compartilhado', 'Ar condicionado'],
        notIncludes: ['Paradas extras', 'Bagagem extra', 'Espera além do programado'],
        serviceDescription: 'Serviço regular de transfer do aeroporto para o centro de Fortaleza.',
        aboutService: 'Opção econômica e confiável para chegar ao centro da cidade. Veículos confortáveis com ar condicionado.',
        highlights: ['Preço acessível', 'Horários regulares', 'Veículos climatizados', 'Motoristas experientes'],
        importantNotes: ['Horários fixos de saída', 'Bagagem limitada', 'Chegada com antecedência'],
        rules: ['Pontualidade obrigatória', 'Bagagem de mão apenas', 'Respeitar outros passageiros'],
        agenda: 'Saídas regulares a cada 30 minutos do aeroporto. Duração aproximada de 45 minutos até o centro da cidade. Paradas em pontos pré-determinados conforme rota estabelecida.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/transfer-aeroporto.pdf',
          banner1: 'https://exemplo.com/banner-transfer-regular.jpg',
          banner2: 'https://exemplo.com/banner-aeroporto-centro.jpg',
          video1: 'https://exemplo.com/video-transfer-aeroporto.mp4',
          bannerEnglish: 'https://exemplo.com/banner-airport-transfer-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-transfer-aeropuerto-es.jpg'
        }
      },
      {
        id: 9,
        name: 'Fortaleza - Jericoacoara',
        price: 'R$ 85,00',
        costPrice: 'R$ 60,00',
        netValue: 'R$ 25,00',
        description: 'Transporte regular entre Fortaleza e Jericoacoara',
        duration: '4 horas',
        people: 'Por pessoa',
        includes: ['Ônibus executivo', 'Ar condicionado', 'Wi-Fi'],
        notIncludes: ['Refeições', 'Paradas extras', 'Bagagem extra'],
        serviceDescription: 'Transporte regular confortável entre Fortaleza e Jericoacoara.',
        aboutService: 'Viagem segura e confortável com ônibus executivo. Saídas diárias nos principais horários.',
        highlights: ['Ônibus executivo', 'Wi-Fi gratuito', 'Saídas diárias', 'Preço econômico'],
        importantNotes: ['Chegada 30min antes', 'Documentos obrigatórios', 'Bagagem limitada'],
        rules: ['Não é permitido fumar', 'Respeitar outros passageiros', 'Seguir horários'],
        agenda: 'Saída de Fortaleza às 7h30 e 14h30. Parada técnica em Jijoca para lanche (não incluso). Chegada em Jericoacoara após 4 horas de viagem. Retorno nos mesmos horários.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/fortaleza-jeri-regular.pdf',
          banner1: 'https://exemplo.com/banner-onibus-jeri.jpg',
          banner2: 'https://exemplo.com/banner-transporte-regular.jpg',
          video1: 'https://exemplo.com/video-viagem-jeri.mp4',
          bannerEnglish: 'https://exemplo.com/banner-fortaleza-jeri-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-fortaleza-jeri-es.jpg'
        }
      }
    ]
  },
  'ingressos-atividades': {
    name: 'Ingressos e Atividades',
    icon: '🎫',
    products: [
      {
        id: 10,
        name: 'Beach Park - Ingresso',
        price: 'R$ 180,00',
        costPrice: 'R$ 144,00',
        netValue: 'R$ 36,00',
        description: 'Ingresso para o maior parque aquático da América Latina',
        duration: 'Dia inteiro',
        people: 'Por pessoa',
        includes: ['Acesso a todas as atrações', 'Estacionamento'],
        notIncludes: ['Alimentação', 'Bebidas', 'Armários', 'Toalhas'],
        serviceDescription: 'Ingresso para o famoso Beach Park, com acesso a todas as atrações aquáticas.',
        aboutService: 'O maior parque aquático da América Latina oferece diversão para toda a família com tobogãs, piscinas e muito mais.',
        highlights: ['Maior parque aquático da AL', 'Todas as atrações inclusas', 'Diversão para toda família', 'Estacionamento gratuito'],
        importantNotes: ['Levar protetor solar', 'Roupas de banho obrigatórias', 'Crianças acompanhadas'],
        rules: ['Seguir regras de segurança', 'Não correr nas bordas', 'Respeitar altura mínima'],
        agenda: 'Entrada a partir das 9h. Acesso livre a todas as atrações durante o dia. Recomendamos começar pelas atrações mais concorridas. Parque funciona até 17h.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/beach-park-info.pdf',
          banner1: 'https://exemplo.com/banner-beach-park.jpg',
          banner2: 'https://exemplo.com/banner-parque-aquatico.jpg',
          video1: 'https://exemplo.com/video-beach-park.mp4',
          bannerEnglish: 'https://exemplo.com/banner-beach-park-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-beach-park-es.jpg'
        }
      },
      {
        id: 11,
        name: 'Passeio de Catamarã',
        price: 'R$ 120,00',
        costPrice: 'R$ 84,00',
        netValue: 'R$ 36,00',
        description: 'Navegue pelas belas águas do litoral cearense',
        duration: '4 horas',
        people: 'Por pessoa',
        includes: ['Embarcação', 'Bebidas', 'Lanche', 'Equipamentos'],
        notIncludes: ['Transporte até o pier', 'Refeições completas', 'Bebidas alcoólicas'],
        serviceDescription: 'Passeio de catamarã pelas águas cristalinas do litoral cearense.',
        aboutService: 'Experiência única navegando pelas águas do Ceará com paradas para banho e contemplação da natureza.',
        highlights: ['Águas cristalinas', 'Paradas para banho', 'Bebidas inclusas', 'Equipamentos fornecidos'],
        importantNotes: ['Sujeito a condições climáticas', 'Levar protetor solar', 'Roupas de banho'],
        rules: ['Seguir instruções da tripulação', 'Colete salva-vidas obrigatório', 'Não pular da embarcação'],
        agenda: 'Embarque às 8h no pier. Navegação pela costa com paradas para banho em águas cristalinas. Lanche e bebidas servidos a bordo. Retorno previsto para 12h.',
        availableDays: ['Segunda', 'Quarta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/catamara-passeio.pdf',
          banner1: 'https://exemplo.com/banner-catamara.jpg',
          banner2: 'https://exemplo.com/banner-navegacao.jpg',
          video1: 'https://exemplo.com/video-catamara.mp4',
          bannerEnglish: 'https://exemplo.com/banner-catamaran-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-catamaran-es.jpg'
        }
      },
      {
        id: 12,
        name: 'Kitesurf - Aula Iniciante',
        price: 'R$ 200,00',
        costPrice: 'R$ 140,00',
        netValue: 'R$ 60,00',
        description: 'Aprenda kitesurf com instrutores certificados',
        duration: '2 horas',
        people: 'Por pessoa',
        includes: ['Equipamentos', 'Instrutor', 'Seguro'],
        notIncludes: ['Transporte', 'Alimentação', 'Equipamentos extras'],
        serviceDescription: 'Aula de kitesurf para iniciantes com instrutores certificados.',
        aboutService: 'Aprenda um dos esportes mais emocionantes do mundo com segurança e diversão garantidas.',
        highlights: ['Instrutores certificados', 'Equipamentos inclusos', 'Seguro incluso', 'Ventos ideais'],
        importantNotes: ['Saber nadar é obrigatório', 'Condições climáticas favoráveis', 'Idade mínima 12 anos'],
        rules: ['Seguir instruções do professor', 'Usar equipamentos de segurança', 'Respeitar outros praticantes'],
        agenda: 'Aula teórica de 30 minutos sobre segurança e técnicas básicas. 1h30 de prática na água com acompanhamento do instrutor. Equipamentos fornecidos durante toda a aula.',
        availableDays: ['Terça', 'Quinta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/kitesurf-iniciante.pdf',
          banner1: 'https://exemplo.com/banner-kitesurf.jpg',
          banner2: 'https://exemplo.com/banner-esporte-aquatico.jpg',
          video1: 'https://exemplo.com/video-kitesurf-aula.mp4',
          bannerEnglish: 'https://exemplo.com/banner-kitesurf-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-kitesurf-es.jpg'
        }
      }
    ]
  },
  'transfers-privativos': {
    name: 'Transfers Privativos',
    icon: '🚗',
    products: [
      {
        id: 13,
        name: 'Transfer Privativo Aeroporto',
        price: 'R$ 120,00',
        costPrice: 'R$ 85,00',
        netValue: 'R$ 35,00',
        description: 'Transporte exclusivo do/para aeroporto',
        duration: '45 min',
        people: 'Até 4 pessoas',
        includes: ['Veículo exclusivo', 'Motorista', 'Ar condicionado'],
        notIncludes: ['Paradas extras', 'Espera além de 30min', 'Pedágios'],
        serviceDescription: 'Transfer privativo com veículo exclusivo para maior conforto e comodidade.',
        aboutService: 'Serviço exclusivo com motorista experiente e veículo confortável. Ideal para quem busca privacidade e pontualidade.',
        highlights: ['Veículo exclusivo', 'Motorista experiente', 'Horário flexível', 'Conforto total'],
        importantNotes: ['Informar horário do voo', 'Contato do motorista fornecido', 'Tolerância de 30min'],
        rules: ['Respeitar horário combinado', 'Bagagem conforme capacidade', 'Tratar motorista com respeito'],
        agenda: 'Motorista aguarda no aeroporto com placa identificadora. Transfer direto ao destino sem paradas. Tempo de viagem aproximado de 45 minutos dependendo do trânsito.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/transfer-privativo.pdf',
          banner1: 'https://exemplo.com/banner-transfer-privativo.jpg',
          banner2: 'https://exemplo.com/banner-conforto-exclusivo.jpg',
          video1: 'https://exemplo.com/video-transfer-privativo.mp4',
          bannerEnglish: 'https://exemplo.com/banner-private-transfer-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-transfer-privado-es.jpg'
        }
      },
      {
        id: 14,
        name: 'Transfer Fortaleza - Jeri Privativo',
        price: 'R$ 450,00',
        costPrice: 'R$ 315,00',
        netValue: 'R$ 135,00',
        description: 'Viagem confortável e exclusiva para Jericoacoara',
        duration: '4 horas',
        people: 'Até 4 pessoas',
        includes: ['SUV 4x4', 'Motorista experiente', 'Paradas para fotos'],
        notIncludes: ['Refeições', 'Bebidas', 'Hospedagem'],
        serviceDescription: 'Transfer privativo para Jericoacoara em veículo 4x4 com motorista experiente.',
        aboutService: 'Viagem exclusiva e confortável com paradas estratégicas para fotos e descanso. Motorista conhece bem a região.',
        highlights: ['SUV 4x4 confortável', 'Paradas para fotos', 'Motorista local', 'Viagem exclusiva'],
        importantNotes: ['Estrada de terra nos últimos km', 'Levar água', 'Protetor solar recomendado'],
        rules: ['Usar cinto de segurança', 'Respeitar meio ambiente', 'Seguir orientações do motorista'],
        agenda: 'Saída de Fortaleza no horário combinado. Parada técnica em Jijoca para lanche (opcional). Trecho final em veículo 4x4 pelas dunas. Chegada em Jericoacoara após 4 horas.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/transfer-jeri-privativo.pdf',
          banner1: 'https://exemplo.com/banner-jeri-transfer.jpg',
          banner2: 'https://exemplo.com/banner-suv-4x4.jpg',
          video1: 'https://exemplo.com/video-viagem-jeri.mp4',
          bannerEnglish: 'https://exemplo.com/banner-jeri-private-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-jeri-privado-es.jpg'
        }
      }
    ]
  },
  'passeios-privativos': {
    name: 'Passeios Privativos',
    icon: '🏝️',
    products: [
      {
        id: 15,
        name: 'Passeio Privativo Jericoacoara',
        price: 'R$ 380,00',
        costPrice: 'R$ 266,00',
        netValue: 'R$ 114,00',
        description: 'Explore Jeri com guia exclusivo e roteiro personalizado',
        duration: 'Dia inteiro',
        people: 'Até 4 pessoas',
        includes: ['Guia exclusivo', 'Transporte 4x4', 'Almoço'],
        notIncludes: ['Bebidas alcoólicas', 'Compras pessoais', 'Gorjetas'],
        serviceDescription: 'Passeio privativo por Jericoacoara com guia especializado e roteiro personalizado.',
        aboutService: 'Explore Jeri de forma exclusiva com guia local experiente. Roteiro flexível adaptado aos seus interesses.',
        highlights: ['Guia exclusivo', 'Roteiro personalizado', 'Transporte 4x4', 'Almoço incluso'],
        importantNotes: ['Roteiro sujeito a maré', 'Levar protetor solar', 'Roupas confortáveis'],
        rules: ['Respeitar meio ambiente', 'Seguir orientações do guia', 'Não alimentar animais'],
        agenda: 'Manhã: Visita à Pedra Furada e lagoas. Almoço em restaurante local. Tarde: Dunas e pôr do sol. Roteiro flexível conforme interesse do grupo.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/passeio-jeri-privativo.pdf',
          banner1: 'https://exemplo.com/banner-passeio-jeri.jpg',
          banner2: 'https://exemplo.com/banner-guia-exclusivo.jpg',
          video1: 'https://exemplo.com/video-passeio-jeri.mp4',
          bannerEnglish: 'https://exemplo.com/banner-jeri-tour-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-tour-jeri-es.jpg'
        }
      },
      {
        id: 16,
        name: 'Rota das Emoções Privativa',
        price: 'R$ 650,00',
        costPrice: 'R$ 455,00',
        netValue: 'R$ 195,00',
        description: 'Conheça os Lençóis Maranhenses com conforto e exclusividade',
        duration: '2 dias',
        people: 'Até 4 pessoas',
        includes: ['Guia especializado', 'Hospedagem', 'Todas as refeições', 'Transporte'],
        notIncludes: ['Bebidas alcoólicas', 'Compras pessoais', 'Seguro viagem'],
        serviceDescription: 'Experiência exclusiva pela famosa Rota das Emoções incluindo os Lençóis Maranhenses.',
        aboutService: 'Aventura única pelos Lençóis Maranhenses com guia especializado e toda estrutura inclusa para máximo conforto.',
        highlights: ['Lençóis Maranhenses', 'Guia especializado', 'Hospedagem inclusa', 'Todas refeições', 'Transporte 4x4'],
        importantNotes: ['Época ideal: maio a setembro', 'Levar repelente', 'Roupas leves e protetor solar'],
        rules: ['Preservar meio ambiente', 'Não deixar lixo', 'Seguir trilhas demarcadas'],
        agenda: 'Dia 1: Saída para Barreirinhas, visita aos Lençóis e lagoas. Dia 2: Passeio de barco pelo Rio Preguiças e retorno. Hospedagem e refeições incluídas.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/rota-emocoes-privativa.pdf',
          banner1: 'https://exemplo.com/banner-lencois-maranhenses.jpg',
          banner2: 'https://exemplo.com/banner-rota-emocoes.jpg',
          video1: 'https://exemplo.com/video-lencois-maranhenses.mp4',
          bannerEnglish: 'https://exemplo.com/banner-lencois-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-lencois-es.jpg'
        }
      }
    ]
  },
  'apenas-hospedagens': {
    name: 'Apenas Hospedagens',
    icon: '🏨',
    products: [
      {
        id: 17,
        name: 'Pousada Centro Jericoacoara',
        price: 'R$ 180,00',
        costPrice: 'R$ 144,00',
        netValue: 'R$ 36,00',
        description: 'Hospedagem simples e confortável no centro de Jeri',
        duration: 'Por noite',
        people: 'Casal',
        includes: ['Quarto com ar condicionado', 'Café da manhã', 'Wi-Fi'],
        notIncludes: ['Transfer', 'Refeições extras', 'Passeios', 'Bebidas'],
        serviceDescription: 'Pousada localizada no centro de Jericoacoara, próxima aos principais pontos turísticos.',
        aboutService: 'Ideal para quem busca hospedagem econômica e bem localizada. Ambiente familiar e acolhedor.',
        highlights: ['Localização central', 'Café da manhã incluso', 'Wi-Fi gratuito', 'Ambiente familiar'],
        importantNotes: ['Check-in 14h', 'Check-out 12h', 'Não permite animais'],
        rules: ['Silêncio após 22h', 'Não fumar nos quartos', 'Respeitar outros hóspedes'],
        agenda: 'Check-in a partir das 14h. Café da manhã servido das 7h às 10h. Check-out até 12h. Localização permite fácil acesso a pé aos principais pontos turísticos.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/pousada-centro-jeri.pdf',
          banner1: 'https://exemplo.com/banner-pousada-jeri.jpg',
          banner2: 'https://exemplo.com/banner-hospedagem-centro.jpg',
          video1: 'https://exemplo.com/video-pousada-jeri.mp4',
          bannerEnglish: 'https://exemplo.com/banner-inn-jeri-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-posada-jeri-es.jpg'
        }
      },
      {
        id: 18,
        name: 'Hotel Beira-mar Fortaleza',
        price: 'R$ 250,00',
        costPrice: 'R$ 200,00',
        netValue: 'R$ 50,00',
        description: 'Hotel confortável na orla de Fortaleza',
        duration: 'Por noite',
        people: 'Casal',
        includes: ['Quarto vista mar', 'Café da manhã', 'Piscina', 'Academia'],
        notIncludes: ['Transfer', 'Almoço e jantar', 'Bebidas', 'Estacionamento'],
        serviceDescription: 'Hotel moderno localizado na orla de Fortaleza com vista para o mar.',
        aboutService: 'Perfeito para quem quer ficar próximo às praias e ao centro da cidade. Estrutura completa de lazer.',
        highlights: ['Vista para o mar', 'Piscina', 'Academia', 'Localização privilegiada'],
        importantNotes: ['Estacionamento pago', 'Check-in 15h', 'Check-out 12h'],
        rules: ['Área da piscina até 22h', 'Não fumar nas dependências', 'Dress code no restaurante'],
        agenda: 'Check-in a partir das 15h. Café da manhã das 6h às 10h. Piscina e academia disponíveis das 6h às 22h. Check-out até 12h.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/hotel-beira-mar-fortaleza.pdf',
          banner1: 'https://exemplo.com/banner-hotel-fortaleza.jpg',
          banner2: 'https://exemplo.com/banner-vista-mar.jpg',
          video1: 'https://exemplo.com/video-hotel-fortaleza.mp4',
          bannerEnglish: 'https://exemplo.com/banner-hotel-fortaleza-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-hotel-fortaleza-es.jpg'
        }
      }
    ]
  },
  'outros': {
    name: 'Outros',
    icon: '⭐',
    products: [
      {
        id: 19,
        name: 'Consultoria Turística Personalizada',
        price: 'R$ 150,00',
        costPrice: 'R$ 105,00',
        netValue: 'R$ 45,00',
        description: 'Planejamento completo da sua viagem com especialista',
        duration: '2 horas',
        people: 'Por consulta',
        includes: ['Consulta especializada', 'Roteiro personalizado', 'Dicas exclusivas'],
        notIncludes: ['Reservas', 'Pagamentos de serviços', 'Acompanhamento presencial'],
        serviceDescription: 'Serviço de consultoria para planejamento personalizado de viagens pelo Ceará.',
        aboutService: 'Nossos especialistas criam roteiros únicos baseados no seu perfil e preferências.',
        highlights: ['Roteiro personalizado', 'Especialista dedicado', 'Dicas exclusivas', 'Economia de tempo'],
        importantNotes: ['Agendamento prévio', 'Consulta online ou presencial', 'Material entregue por email'],
        rules: ['Pontualidade', 'Informações precisas sobre preferências', 'Pagamento antecipado'],
        agenda: 'Consulta inicial para entender perfil e preferências. Análise e criação do roteiro personalizado. Apresentação do roteiro com dicas e sugestões exclusivas.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/consultoria-turistica.pdf',
          banner1: 'https://exemplo.com/banner-consultoria.jpg',
          banner2: 'https://exemplo.com/banner-planejamento.jpg',
          video1: 'https://exemplo.com/video-consultoria.mp4',
          bannerEnglish: 'https://exemplo.com/banner-consulting-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-consultoria-es.jpg'
        }
      },
      {
        id: 20,
        name: 'Seguro Viagem Ceará',
        price: 'R$ 25,00',
        costPrice: 'R$ 18,00',
        netValue: 'R$ 7,00',
        description: 'Proteção completa durante sua estadia no Ceará',
        duration: 'Por dia',
        people: 'Por pessoa',
        includes: ['Cobertura médica', 'Assistência 24h', 'Cobertura bagagem'],
        notIncludes: ['Doenças preexistentes', 'Esportes radicais', 'Atos imprudentes'],
        serviceDescription: 'Seguro viagem específico para turistas no Ceará com cobertura completa.',
        aboutService: 'Proteção essencial para sua tranquilidade durante a viagem. Cobertura nacional com foco regional.',
        highlights: ['Assistência 24h', 'Cobertura médica', 'Proteção bagagem', 'Preço acessível'],
        importantNotes: ['Contratar antes da viagem', 'Documentos necessários', 'Carência de 24h'],
        rules: ['Informar condições preexistentes', 'Guardar comprovantes', 'Comunicar sinistros imediatamente'],
        agenda: 'Contratação online ou presencial. Cobertura inicia 24h após contratação. Assistência disponível 24h por telefone. Válido durante todo período da viagem.',
        availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        specialistLibrary: {
          pdf: 'https://exemplo.com/seguro-viagem-ceara.pdf',
          banner1: 'https://exemplo.com/banner-seguro-viagem.jpg',
          banner2: 'https://exemplo.com/banner-protecao.jpg',
          video1: 'https://exemplo.com/video-seguro-viagem.mp4',
          bannerEnglish: 'https://exemplo.com/banner-travel-insurance-en.jpg',
          bannerSpanish: 'https://exemplo.com/banner-seguro-viaje-es.jpg'
        }
      }
    ]
  }
}

// Componente para texto com "ver mais"
const ExpandableText = ({ text, maxLength = 200 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (text.length <= maxLength) {
    return <p className="text-gray-700 leading-relaxed">{text}</p>
  }
  
  return (
    <div>
      <p className="text-gray-700 leading-relaxed">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Ver menos
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Ver mais
          </>
        )}
      </button>
    </div>
  )
}

// Componente para biblioteca do especialista com links individuais por categoria
const SpecialistLibrarySection = ({ product, categoryKey }: { product: Product; categoryKey: CategoryKey }) => {
  const [copiedLink, setCopiedLink] = useState('')
  
  const copyToClipboard = (link: string, type: string) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(`${type}-${product.id}`)
    setTimeout(() => setCopiedLink(''), 2000)
  }

  const isPackageCategory = packageCategories.includes(categoryKey)
  
  if (isPackageCategory) {
    // Para produtos específicos (pacotes), biblioteca fica dentro dos detalhes de precificação
    return null
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center">
        📚 Biblioteca do Especialista
      </h3>
      <p className="text-gray-600 text-center mb-6">Links úteis para compartilhar com seus clientes</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* PDF */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-6 h-6 text-red-500" />
            <span className="font-medium text-gray-800">PDF</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.pdf, 'pdf')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `pdf-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>

        {/* Banner 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Image className="w-6 h-6 text-blue-500" />
            <span className="font-medium text-gray-800">Banner 1</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.banner1, 'banner1')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `banner1-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>

        {/* Banner 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Image className="w-6 h-6 text-green-500" />
            <span className="font-medium text-gray-800">Banner 2</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.banner2, 'banner2')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `banner2-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>

        {/* Vídeo 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Video className="w-6 h-6 text-purple-500" />
            <span className="font-medium text-gray-800">Vídeo 1</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.video1, 'video1')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `video1-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>

        {/* Banner Inglês */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-indigo-500" />
            <span className="font-medium text-gray-800">Banner Inglês</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.bannerEnglish, 'bannerEnglish')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `bannerEnglish-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>

        {/* Banner Espanhol */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-orange-500" />
            <span className="font-medium text-gray-800">Banner Espanhol</span>
          </div>
          <button
            onClick={() => copyToClipboard(product.specialistLibrary.bannerSpanish, 'bannerSpanish')}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            {copiedLink === `bannerSpanish-${product.id}` ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente para detalhes de precificação
const PricingDetails = ({ product, categoryKey }: { product: Product; categoryKey: CategoryKey }) => {
  const { pricingDetails } = product
  const [copiedLink, setCopiedLink] = useState('')
  
  if (!pricingDetails) return null

  const copyToClipboard = (link: string, type: string) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(`${type}-${product.id}`)
    setTimeout(() => setCopiedLink(''), 2000)
  }
  
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-emerald-200">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        Detalhes de Precificação
      </h3>
      
      <div className="space-y-6">
        {/* Temporadas */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Temporadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alta Temporada */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium text-gray-800">Alta Temporada</span>
              </div>
              <div className="space-y-1">
                {pricingDetails.seasons.high.period.map((month: string, index: number) => (
                  <p key={index} className="text-sm text-gray-600">{month}</p>
                ))}
              </div>
            </div>
            
            {/* Baixa Temporada */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-800">Baixa Temporada</span>
              </div>
              <div className="space-y-1">
                {pricingDetails.seasons.low.period.map((month: string, index: number) => (
                  <p key={index} className="text-sm text-gray-600">{month}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Categorias de Hospedagem */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-600" />
            Categorias de Hospedagem
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(pricingDetails.accommodationTypes).map(([key, accommodation]: [string, any]) => (
              <div key={key} className="bg-white rounded-xl p-4 border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-4 text-center">{accommodation.name}</h5>
                
                {/* Baixa Temporada */}
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium text-green-700">Baixa Temporada</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Single (1 pessoa)</p>
                      <p className="text-sm font-semibold text-orange-600">
                        R$ {Math.round(accommodation.basePrice * pricingDetails.occupancy.single.multiplier).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">A partir de 2 pessoas</p>
                      <p className="text-sm font-semibold text-green-600">
                        R$ {accommodation.basePrice.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Biblioteca do Especialista para Baixa Temporada */}
                  <div className="mt-4 pt-3 border-t border-green-200">
                    <p className="text-xs font-medium text-green-700 mb-2">📚 Biblioteca do Especialista</p>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Single */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Single</p>
                        <div className="space-y-1">
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.pdf}?season=low&occupancy=single&category=${key}`, `pdf-low-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `pdf-low-single-${key}-${product.id}` ? 'Copiado!' : 'PDF'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner1}?season=low&occupancy=single&category=${key}`, `banner1-low-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner1-low-single-${key}-${product.id}` ? 'Copiado!' : 'Banner 1'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner2}?season=low&occupancy=single&category=${key}`, `banner2-low-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner2-low-single-${key}-${product.id}` ? 'Copiado!' : 'Banner 2'}
                          </button>
                        </div>
                      </div>
                      
                      {/* A partir de 2 pessoas */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">2+ pessoas</p>
                        <div className="space-y-1">
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.pdf}?season=low&occupancy=double&category=${key}`, `pdf-low-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `pdf-low-double-${key}-${product.id}` ? 'Copiado!' : 'PDF'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner1}?season=low&occupancy=double&category=${key}`, `banner1-low-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner1-low-double-${key}-${product.id}` ? 'Copiado!' : 'Banner 1'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner2}?season=low&occupancy=double&category=${key}`, `banner2-low-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner2-low-double-${key}-${product.id}` ? 'Copiado!' : 'Banner 2'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Alta Temporada */}
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-sm font-medium text-red-700">Alta Temporada</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Single (1 pessoa)</p>
                      <p className="text-sm font-semibold text-red-600">
                        R$ {Math.round(accommodation.basePrice * pricingDetails.seasons.high.multiplier * pricingDetails.occupancy.single.multiplier).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">A partir de 2 pessoas</p>
                      <p className="text-sm font-semibold text-red-600">
                        R$ {Math.round(accommodation.basePrice * pricingDetails.seasons.high.multiplier).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Biblioteca do Especialista para Alta Temporada */}
                  <div className="mt-4 pt-3 border-t border-red-200">
                    <p className="text-xs font-medium text-red-700 mb-2">📚 Biblioteca do Especialista</p>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Single */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Single</p>
                        <div className="space-y-1">
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.pdf}?season=high&occupancy=single&category=${key}`, `pdf-high-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `pdf-high-single-${key}-${product.id}` ? 'Copiado!' : 'PDF'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner1}?season=high&occupancy=single&category=${key}`, `banner1-high-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner1-high-single-${key}-${product.id}` ? 'Copiado!' : 'Banner 1'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner2}?season=high&occupancy=single&category=${key}`, `banner2-high-single-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner2-high-single-${key}-${product.id}` ? 'Copiado!' : 'Banner 2'}
                          </button>
                        </div>
                      </div>
                      
                      {/* A partir de 2 pessoas */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">2+ pessoas</p>
                        <div className="space-y-1">
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.pdf}?season=high&occupancy=double&category=${key}`, `pdf-high-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `pdf-high-double-${key}-${product.id}` ? 'Copiado!' : 'PDF'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner1}?season=high&occupancy=double&category=${key}`, `banner1-high-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner1-high-double-${key}-${product.id}` ? 'Copiado!' : 'Banner 1'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(`${product.specialistLibrary.banner2}?season=high&occupancy=double&category=${key}`, `banner2-high-double-${key}`)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          >
                            {copiedLink === `banner2-high-double-${key}-${product.id}` ? 'Copiado!' : 'Banner 2'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Observações */}
          <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="space-y-2">
              <p className="text-sm text-blue-700">
                <strong>•</strong> O valor é a partir de duas pessoas e proporcional para demais quantidades.
              </p>
              <p className="text-sm text-blue-700">
                <strong>•</strong> Crianças de até 4 anos dormem na cama com os pais e, durante o transporte, viajam no colo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente do Pop-up de Notificações
const NotificationsPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Novidades e Destaques</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="max-h-96 overflow-y-auto">
          {notificationsData.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {notification.isNew && (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(notification.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      notification.type === 'promotion' ? 'bg-orange-100 text-orange-700' :
                      notification.type === 'new-service' ? 'bg-green-100 text-green-700' :
                      notification.type === 'tip' ? 'bg-blue-100 text-blue-700' :
                      notification.type === 'update' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {notification.type === 'promotion' ? 'Promoção' :
                       notification.type === 'new-service' ? 'Novo' :
                       notification.type === 'tip' ? 'Dica' :
                       notification.type === 'update' ? 'Atualização' :
                       'Lembrete'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            {notificationsData.filter(n => n.isNew).length} novas notificações
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Portal() {
  const [currentView, setCurrentView] = useState<string>('home') // 'home', 'category', 'product', 'triggers'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>('')
  const [copiedTrigger, setCopiedTrigger] = useState<string>('')
  const [showNotifications, setShowNotifications] = useState<boolean>(false)

  // Estados para filtros inteligentes
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000])
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  // Função de busca que procura em todos os produtos (página inicial)
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    
    const results: any[] = []
    Object.entries(categoriesData).forEach(([categoryKey, category]: [string, any]) => {
      category.products.forEach((product: Product) => {
        if (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            ...product,
            categoryName: category.name,
            categoryKey
          })
        }
      })
    })
    return results
  }, [searchTerm])

  // Função para extrair valor numérico do preço
  const extractPrice = (priceString: string) => {
    if (!priceString) return 0
    const numericValue = priceString.replace(/[^\d,]/g, '').replace(',', '.')
    return parseFloat(numericValue) || 0
  }

  // Função de busca específica da categoria com filtros
  const getCategorySearchResults = () => {
    if (!selectedCategory) return []
    
    const category: any = categoriesData[selectedCategory as keyof typeof categoriesData]
    if (!category) return []
    
    let products: Product[] = category.products

    // Aplicar filtro de busca por texto
    if (categorySearchTerm.trim()) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(categorySearchTerm.toLowerCase())
      )
    }

    // Aplicar filtro de preço
    products = products.filter(product => {
      const price = extractPrice(product.price)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Aplicar filtro de dias (apenas para categorias aplicáveis)
    const applicableCategories = ['servicos-regulares', 'ingressos-atividades']
    if (selectedDays.length > 0 && applicableCategories.includes(selectedCategory)) {
      products = products.filter(product => {
        if (!product.availableDays) return true
        return selectedDays.some(day => product.availableDays.includes(day))
      })
    }

    return products
  }

  const categorySearchResults = getCategorySearchResults()

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
    setCurrentView('category')
    setSearchTerm('')
    setCategorySearchTerm('')
    // Reset filtros
    setPriceRange([0, 5000])
    setSelectedDays([])
    setShowFilters(false)
  }

  const handleProductClick = (product: Product, categoryKey: string | null = null) => {
    setSelectedProduct(product)
    if (categoryKey) setSelectedCategory(categoryKey)
    setCurrentView('product')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedCategory(null)
    setSelectedProduct(null)
    setSearchTerm('')
    setCategorySearchTerm('')
    // Reset filtros
    setPriceRange([0, 5000])
    setSelectedDays([])
    setShowFilters(false)
  }

  const handleBackToCategory = () => {
    setCurrentView('category')
    setSelectedProduct(null)
  }

  const handleTriggersClick = () => {
    setCurrentView('triggers')
    setSearchTerm('')
  }

  const copyTriggerLink = (link: string, triggerId: string | number) => {
    navigator.clipboard.writeText(link)
    setCopiedTrigger(String(triggerId))
    setTimeout(() => setCopiedTrigger(''), 2000)
  }

  // Função para alternar dias selecionados
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  // Função para limpar filtros
  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedDays([])
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 5000 || selectedDays.length > 0

  // Renderização da página de gatilhos
  if (currentView === 'triggers') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header com botão voltar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 pt-4 sm:pt-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
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
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full"
                >
                  {/* Barra colorida no topo com gradiente específico */}
                  <div className={`h-3 bg-gradient-to-r ${trigger.color}`}></div>
                  
                  <div className="p-4 sm:p-5 md:p-6 text-center flex flex-col justify-between flex-1">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-4">
                        <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-gray-600" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">{trigger.name}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                        {trigger.description}
                      </p>
                    </div>
                    <button
                      onClick={() => copyTriggerLink(trigger.link, trigger.id)}
                      className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
                        copiedTrigger === String(trigger.id)
                          ? 'bg-green-500 text-white border-2 border-green-500'
                          : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      {copiedTrigger === String(trigger.id) ? (
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

          {/* Informações adicionais */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-yellow-200">
            <div className="text-center">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-yellow-600" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Como usar os gatilhos</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Clique em qualquer gatilho para copiar o link automaticamente. 
                Em seguida, compartilhe com seus clientes via WhatsApp, email ou outras plataformas.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-500">
                <span className="bg-white px-3 py-1 rounded-full">📱 WhatsApp</span>
                <span className="bg-white px-3 py-1 rounded-full">📧 Email</span>
                <span className="bg-white px-3 py-1 rounded-full">💬 Telegram</span>
                <span className="bg-white px-3 py-1 rounded-full">📱 Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Renderização da página inicial
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header com Logo e Sino de Notificações */}
          <div className="text-center mb-3 sm:mb-4 pt-0 -mt-2 sm:-mt-3 md:-mt-4 relative">
            {/* Sino de Notificações - Posicionado no canto superior direito */}
            <div className="absolute top-0 right-0">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {/* Indicador de novas notificações */}
                {notificationsData.filter(n => n.isNew).length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {notificationsData.filter(n => n.isNew).length}
                  </div>
                )}
              </button>
            </div>

            <div className="flex justify-center mb-0">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2efe1f8e-9651-4a63-a0b0-b55a0fc6644f.png" 
                alt="Logo SIM7" 
                className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-0.5 sm:mb-1">Portal de Serviços</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Sistema interno para consulta de valores e serviços</p>
          </div>

          {/* Barra de Pesquisa - Expandida horizontalmente */}
          <div className="relative mb-6 sm:mb-8 w-full max-w-5xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="Pesquise por serviços, destinos ou atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>

            {/* Resultados da Pesquisa */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-2xl border mt-2 max-h-80 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product, product.categoryKey)}
                        className="p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                          <div className="flex-1 mb-2 sm:mb-0">
                            <h3 className="font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-2 inline-block">
                              {product.categoryName}
                            </span>
                          </div>
                          <div className="text-right sm:ml-4">
                            <span className="text-lg font-bold text-green-600">{product.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum resultado encontrado para "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grid de Categorias - Responsivo com alinhamento padronizado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {Object.entries(categoriesData).map(([key, category]: [string, any]) => (
              <div
                key={key}
                onClick={() => handleCategoryClick(key)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                {/* Barra colorida no topo */}
                <div className={`h-2 bg-gradient-to-r ${categoryColors[key as keyof typeof categoryColors]}`}></div>
                
                <div className="p-4 sm:p-5 md:p-6 text-center flex flex-col justify-between flex-1">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">{category.icon}</div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">{category.name}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                      {categoryDescriptions[key as keyof typeof categoryDescriptions]}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      {category.products.length} {category.products.length === 1 ? 'serviço' : 'serviços'}
                    </p>
                  </div>
                  <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md w-full">
                    Ver Serviços
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Biblioteca de Gatilhos - Seção mais clean e leve */}
          <div className="mt-8 sm:mt-12">
            <div 
              onClick={handleTriggersClick}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8 text-center">
                {/* Ícone mais sutil */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-2xl">
                    <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600" />
                  </div>
                </div>
                
                {/* Título com cores mais suaves */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-800">Biblioteca de Gatilhos</h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto">
                  Acesse gatilhos visuais prontos para compartilhar com seus clientes e aumentar suas vendas
                </p>
                
                {/* Tags com cores mais suaves */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-200">
                    📊 Prestação da empresa
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-200">
                    🛡️ Gatilho de confiança
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-200">
                    🎁 Cupom primeira compra
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-200">
                    💳 Nosso Pix
                  </span>
                </div>
                
                {/* Botão mais sutil */}
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  Acessar Biblioteca
                </button>
              </div>
            </div>
          </div>

          {/* Pop-up de Notificações */}
          <NotificationsPopup 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
          />
        </div>
      </div>
    )
  }

  // Renderização da página de categoria
  if (currentView === 'category' && selectedCategory) {
    const category = categoriesData[selectedCategory as keyof typeof categoriesData]
    const applicableCategories = ['servicos-regulares', 'ingressos-atividades']
    const showDayFilter = applicableCategories.includes(selectedCategory)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header com botão voltar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 pt-4 sm:pt-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <div className="sm:ml-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl">{category.icon}</span>
                {category.name}
              </h1>
              {/* Descrição da categoria */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base mb-1">
                {categoryPageDescriptions[selectedCategory as keyof typeof categoryPageDescriptions]}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">{categorySearchResults.length} serviços disponíveis</p>
            </div>
          </div>

          {/* Barra de Pesquisa da Categoria - Expandida horizontalmente */}
          <div className="relative mb-6 sm:mb-8 w-full max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder={`Buscar em ${category.name}...`}
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          {/* Filtros Inteligentes */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                  hasActiveFilters 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtros Inteligentes
                {hasActiveFilters && (
                  <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-xs font-bold">
                    Ativos
                  </span>
                )}
              </button>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                      <button
                        onClick={() => setPriceRange([0, 5000])}
                        className="hover:bg-blue-200 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedDays.map(day => (
                    <span key={day} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {day}
                      <button
                        onClick={() => toggleDay(day)}
                        className="hover:bg-green-200 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700 text-sm underline"
                  >
                    Limpar todos
                  </button>
                </div>
              )}
            </div>

            {/* Painel de Filtros */}
            {showFilters && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Filtro de Preço */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Faixa de Preço
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-2">Mínimo</label>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-2">Máximo</label>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="5000"
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Mostrando serviços de R$ {priceRange[0]} até R$ {priceRange[1]}
                      </div>
                    </div>
                  </div>

                  {/* Filtro de Dias da Semana */}
                  {showDayFilter && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Dias de Disponibilidade
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(day => (
                          <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedDays.includes(day)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      {selectedDays.length > 0 && (
                        <div className="mt-3 text-sm text-gray-600">
                          Filtrando por: {selectedDays.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contador de Resultados */}
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              {categorySearchResults.length === 0 ? 'Nenhum serviço encontrado' : 
               categorySearchResults.length === 1 ? '1 serviço encontrado' :
               `${categorySearchResults.length} serviços encontrados`}
              {hasActiveFilters && ' com os filtros aplicados'}
            </p>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {categorySearchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                {/* Barra colorida no topo */}
                <div className={`h-2 bg-gradient-to-r ${categoryColors[selectedCategory as keyof typeof categoryColors]}`}></div>
                
                <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-1">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{product.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{product.description}</p>
                    
                    <div className="flex flex-col gap-2 text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{product.people}</span>
                      </div>
                      {/* Mostrar dias disponíveis se aplicável */}
                      {showDayFilter && product.availableDays && (
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 mt-0.5" />
                          <div className="flex flex-wrap gap-1">
                            {product.availableDays.map(day => (
                              <span key={day} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-green-600">{product.price}</span>
                      <span className="text-xs text-gray-500">Valor de venda.</span>
                    </div>
                    <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem quando não há resultados */}
          {categorySearchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum serviço encontrado</h3>
              <p className="text-gray-500 mb-4">
                {categorySearchTerm ? `Nenhum resultado para "${categorySearchTerm}"` : 'Nenhum serviço corresponde aos filtros aplicados'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Limpar filtros e ver todos os serviços
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Renderização da página do produto
  if (currentView === 'product' && selectedProduct && selectedCategory) {
    const category = categoriesData[selectedCategory as keyof typeof categoriesData]
    const isPackageCategory = packageCategories.includes(selectedCategory)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-6 sm:mb-8 pt-4 sm:pt-6">
            <button
              onClick={handleBackToCategory}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>

          {/* Detalhes do Produto */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Barra colorida no topo */}
            <div className={`h-2 bg-gradient-to-r ${categoryColors[selectedCategory as keyof typeof categoryColors]}`}></div>
            
            <div className="p-4 sm:p-6 md:p-8">
              <div className="mb-8">
                {/* Informação da categoria no topo */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="text-lg">{category.icon}</span>
                    {category.name}
                  </span>
                </div>
                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{selectedProduct.name}</h1>
                
                {/* Breve descrição abaixo do nome */}
                <p className="text-gray-600 text-sm sm:text-base mb-6">{selectedProduct.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Pessoas</p>
                      <p className="font-semibold">{selectedProduct.people}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <DollarSign className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Valor</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{selectedProduct.price}</p>
                      <p className="text-xs text-gray-500">Valor de venda.</p>
                      {/* Mostrar preço de custo e valor net para TODOS os serviços */}
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Preço de Custo:</span> {selectedProduct.costPrice}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Valor Net:</span> {selectedProduct.netValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seções do serviço */}
              <div className="space-y-6">
                {/* Descrição do serviço */}
                <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Descrição do Serviço
                  </h3>
                  <ExpandableText text={selectedProduct.serviceDescription} />
                </div>

                {/* Sobre o serviço */}
                <div className="bg-purple-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Sobre o Serviço</h3>
                  <ExpandableText text={selectedProduct.aboutService} />
                </div>

                {/* Duração */}
                <div className="bg-orange-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Duração do Serviço
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">{selectedProduct.duration}</p>
                </div>

                {/* O que está incluído */}
                <div className="bg-green-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    O que está incluído
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.includes.map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* O que não está incluído */}
                <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    O que não está incluído
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.notIncludes.map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destaques */}
                <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Destaques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.highlights.map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações importantes */}
                <div className="bg-amber-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Observações Importantes</h3>
                  <div className="space-y-2">
                    {selectedProduct.importantNotes.map((note: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Normas */}
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Normas</h3>
                  <div className="space-y-2">
                    {selectedProduct.rules.map((rule: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agenda */}
                <div className="bg-indigo-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Agenda
                  </h3>
                  <ExpandableText text={selectedProduct.agenda} />
                </div>

                {/* Detalhes de precificação - APENAS para categorias de pacotes */}
                {isPackageCategory && (
                  <PricingDetails product={selectedProduct} categoryKey={selectedCategory} />
                )}

                {/* Biblioteca do Especialista - Para categorias que NÃO são pacotes */}
                <SpecialistLibrarySection product={selectedProduct} categoryKey={selectedCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}