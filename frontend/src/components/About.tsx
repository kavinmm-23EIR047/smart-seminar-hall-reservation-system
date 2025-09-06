import React from 'react';
import { Target, Eye, Award, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    { year: '1984', milestone: 'College Established' },
    { year: '1992', milestone: 'AICTE Recognition' },
    { year: '2005', milestone: 'Autonomous Status Granted' },
    { year: '2018', milestone: 'NAAC A+ Accreditation' },
    { year: '2023', milestone: '8000+ Students Enrolled' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Kongu Engineering College</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Established in 1984, Kongu Engineering College has been a beacon of excellence in 
            technical education, fostering innovation and nurturing future engineers for over 
            four decades.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-in-left">
              <Target className="text-blue-800 mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide quality technical education that develops competent engineers 
                and technologists who contribute to the technological advancement of society 
                while maintaining the highest standards of ethics and professionalism.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-in-right">
              <Eye className="text-green-600 mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a premier institution of engineering education that produces globally 
                competent professionals, fosters research and innovation, and serves as a 
                catalyst for societal transformation through technological excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our path to excellence</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-800 to-green-600 rounded-full"></div>
            {achievements.map((item, index) => (
              <div key={index} className={`flex items-center mb-8 animate-slide-in-up ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900">{item.milestone}</h4>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm z-10 shadow-lg">
                  {item.year}
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-in-left">
              <Award className="text-blue-800 mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                NAAC A+ accredited institution with a strong focus on quality education and research.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-in-right">
              <BookOpen className="text-green-600 mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Strong partnerships with leading companies ensuring practical exposure and excellent placements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;