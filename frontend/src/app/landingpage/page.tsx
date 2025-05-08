'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Workflow, SlidersHorizontal, BarChart3 } from 'lucide-react';

import Link from 'next/link'; // Import the Link component

export default function LandingPage() {
  return (
    <main className="relative w-full min-h-screen text-white">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20industrial%20facility%20with%20modern%20piping%20systems%20and%20inspection%20equipment%2C%20advanced%20technical%20inspection%20setup%20with%20blue%20accent%20lighting%2C%20clean%20industrial%20environment%20showing%20quality%20control%20processes&width=1440&height=1024&seq=hero-bg-5&orientation=landscape"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Bottom Fade to Black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black-10 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight text-center">
            Welcome to{' '}
            <span className="inline-flex ml-2 text-orange-400">
              {'Employee Management'.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-waveOnce"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Empower HR with document control, profile tracking, and advanced reporting — all in one intuitive platform.
          </p>
          <div className="mt-8">
            <Link href="/login">
              <Button
                size="lg"
                className="text-base px-6 py-4 bg-white border text-black hover:bg-black hover:text-white hover:border-black transition"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <section className="bg-black w-full py-16 px-6 text-white z-0">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2 text-white">Key Features</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Our employee management system offers comprehensive tools to streamline your HR operations and improve
            organizational efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Workflow className="h-14 w-14 text-white" />,
                title: 'Advanced Automation',
                desc: 'Say goodbye to manual tasks and hello to efficiency! Our robust automation features allow you to automate every aspect of your HR system.',
                titleColor: 'text-orange-400',
              },
              {
                icon: <SlidersHorizontal className="h-14 w-14 text-white" />,
                title: 'Dynamic Personalization',
                desc: 'Engage employees like never before with personalized dashboards tailored to roles, departments, and activities.',
                titleColor: 'text-orange-400',
              },
              {
                icon: <BarChart3 className="h-14 w-14 text-white" />,
                title: 'Powerful Analytics',
                desc: 'Knowledge is power! Gain valuable insights into your workforce using rich analytics and visual reports.',
                titleColor: 'text-orange-400',
              },
            ].map(({ icon, title, desc, titleColor }) => (
              <div
                key={title}
                className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg flex flex-col items-center text-center min-h-[300px] transition-transform duration-300 transform hover:scale-105 hover:ring-2 hover:ring-orange-400 hover:ring-offset-2 hover:ring-offset-black"
              >
                <div className="mb-6">{icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${titleColor}`}>{title}</h3>
                <p className="text-base text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Image on the left */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://readdy.ai/api/search-image?query=Industrial%20piping%20system%20inspection%20with%20technical%20equipment%2C%20detailed%20close-up%20of%20pipeline%20quality%20control%20process%2C%20professional%20inspection%20environment%20with%20modern%20technology&width=600&height=400&seq=piping-1&orientation=landscape"
              alt="Piping Inspection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text content on the right */}
          <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">Comprehensive Audit Logging</h2>
            <p className="text-gray-400 mb-4">
              Maintain complete transparency with detailed audit trails tracking every change made within the system.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Track all system activities with user, timestamp, and action details</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Searchable logs for compliance and security reviews</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Data change history for accountability and error resolution</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
