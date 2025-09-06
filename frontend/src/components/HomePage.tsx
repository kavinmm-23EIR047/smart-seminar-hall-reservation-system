import React from 'react';
import { BookOpen, Users, Award, Calendar, ArrowRight, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={40} />,
      title: "Academic Excellence",
      description: "Leading engineering education with state-of-the-art facilities and experienced faculty."
    },
    {
      icon: <Users size={40} />,
      title: "Research & Innovation",
      description: "Cutting-edge research programs fostering innovation and technological advancement."
    },
    {
      icon: <Award size={40} />,
      title: "Industry Recognition",
      description: "NAAC A+ accredited with strong industry partnerships and placement records."
    },
    {
      icon: <Calendar size={40} />,
      title: "Modern Infrastructure",
      description: "Well-equipped laboratories, seminar halls, and digital learning environments."
    }
  ];

  const stats = [
    { number: "15+", label: "Departments" },
    { number: "8000+", label: "Students" },
    { number: "400+", label: "Faculty Members" },
    { number: "95%", label: "Placement Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-green-600 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to Kongu Engineering College
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
              Empowering minds, shaping futures through quality education and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Explore Programs
              </button>
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Book Seminar Hall
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-green-400/20 rounded-full animate-float"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Kongu Engineering College?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us a leader in engineering education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-green-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest News & Events
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest happenings at our college
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-500 mr-2" size={20} />
                <span className="text-blue-800 font-semibold">Dec 15, 2025</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Annual Tech Symposium 2025</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Join us for the biggest technical event featuring workshops, competitions, and industry experts.
              </p>
              <button className="text-blue-800 font-semibold hover:text-blue-600 flex items-center transition-colors">
                Read More <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-500 mr-2" size={20} />
                <span className="text-green-800 font-semibold">Dec 10, 2025</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Placement Drive Success</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our students achieved exceptional results in the latest placement drive with top companies.
              </p>
              <button className="text-green-800 font-semibold hover:text-green-600 flex items-center transition-colors">
                Read More <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;