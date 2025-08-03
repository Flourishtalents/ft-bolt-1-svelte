<script lang="ts">
  import { user, isAuthenticated } from '$lib/stores/auth';
  import { navigate } from '$lib/stores/router';
  import { Star, Users, Target, Building, Globe, ArrowRight, Play, Award, Zap } from 'lucide-svelte';
  
  const features = [
    {
      title: 'Talent Discovery',
      description: 'Connect with exceptional creative talents across entertainment, media, and marketing industries.',
      icon: Star,
      href: '/talent/discovery',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Portfolio Creation',
      description: 'Build stunning professional portfolios that showcase your unique talents and creative abilities.',
      icon: Users,
      href: '/talent/portfolio',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'MasterClass Learning',
      description: 'Access world-class education and certification in creative arts and digital marketing.',
      icon: Award,
      href: '/talent/masterclass',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Community Club',
      description: 'Join an exclusive community of talents, collaborate, and grow together in your creative journey.',
      icon: Zap,
      href: '/community/club',
      gradient: 'from-orange-500 to-red-500'
    }
  ];
  
  const stats = [
    { label: 'Active Talents', value: '2,500+', icon: Users },
    { label: 'Successful Projects', value: '1,200+', icon: Target },
    { label: 'Partner Brands', value: '300+', icon: Building },
    { label: 'Countries', value: '15+', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'Adaora Okafor',
      role: 'Fashion Model',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'FlourishTalents transformed my career. The platform connected me with amazing brands and helped me build a professional portfolio that stands out.'
    },
    {
      name: 'James Thompson',
      role: 'Actor & Voice Artist',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The MasterClass program elevated my skills to a professional level. The community support and networking opportunities are incredible.'
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Music Artist',
      image: 'https://images.pexels.com/photos/1181448/pexels-photo-1181448.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Being part of the FlourishTalents Club opened doors I never imagined. The collaborative projects and mentorship are game-changing.'
    }
  ];
</script>

<svelte:head>
  <title>FlourishTalents - Empowering Creative Excellence</title>
  <meta name="description" content="Connect with exceptional creative talents. Build stunning portfolios. Access world-class education. Join our community of creators." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden min-h-screen flex items-center">
  <div class="absolute inset-0 bg-black/10"></div>
  
  <!-- Animated Background Elements -->
  <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
  <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
  <div class="absolute top-3/4 left-1/2 w-96 h-96 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
  
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
    <div class="text-center">
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
        Empowering
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-100 animate-pulse">
          Creative Excellence
        </span>
      </h1>
      <p class="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
        Connect exceptional talents with global opportunities. Build stunning portfolios. 
        Access world-class education. Join a thriving community of creators.
      </p>
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {#if $isAuthenticated}
          <button on:click={() => navigate('/talent/portfolio')} class="btn-primary text-xl px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <span>Go to Your Portfolio</span>
            <ArrowRight class="w-5 h-5" />
          </button>
          <button on:click={() => navigate('/client/dashboard')} class="btn-secondary text-xl px-10 py-5 bg-white/10 border-white text-white hover:bg-white/20 shadow-2xl backdrop-blur-sm">
            Client Dashboard
          </button>
        {:else}
          <button on:click={() => navigate('/auth/register')} class="btn-primary text-xl px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <span>Get Started Today</span>
            <ArrowRight class="w-5 h-5" />
          </button>
          <button on:click={() => navigate('/talent/discovery')} class="btn-secondary text-xl px-10 py-5 bg-white/10 border-white text-white hover:bg-white/20 shadow-2xl backdrop-blur-sm flex items-center space-x-2">
            <Play class="w-5 h-5" />
            <span>Discover Talents</span>
          </button>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Everything You Need to Flourish
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Comprehensive tools and resources designed to elevate your creative career and connect you with the right opportunities.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each features as feature}
        <button on:click={() => navigate(feature.href)} class="card p-8 text-center group cursor-pointer w-full text-left">
          <div class="relative mb-6">
            <div class="w-20 h-20 bg-gradient-to-r {feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 ease-out group-hover:scale-105">
              <svelte:component this={feature.icon} class="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">{feature.title}</h3>
          <p class="text-gray-600 leading-relaxed">{feature.description}</p>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/10"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Making Impact Worldwide
      </h2>
      <p class="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
        Join thousands of talents and brands who trust FlourishTalents to deliver exceptional creative solutions.
      </p>
    </div>
    
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {#each stats as stat}
        <div class="text-center group">
          <div class="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svelte:component this={stat.icon} class="w-12 h-12 text-white" />
          </div>
          <div class="text-5xl md:text-6xl font-bold text-white mb-3 group-hover:text-accent-200 transition-colors duration-300">{stat.value}</div>
          <div class="text-white/80 text-lg font-medium">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Success Stories
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Hear from our talented community members who have transformed their creative careers with FlourishTalents.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each testimonials as testimonial}
        <div class="card p-8 text-center">
          <div class="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
            <img src={testimonial.image} alt={testimonial.name} class="w-full h-full object-cover" />
          </div>
          <blockquote class="text-gray-700 italic mb-6 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
          <div>
            <div class="font-bold text-gray-900 text-lg">{testimonial.name}</div>
            <div class="text-primary-600 font-medium">{testimonial.role}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Dedicated Teams Section -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Dedicated Teams
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Specialized teams of experts ready to bring your creative vision to life with professional excellence.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">🎭</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Entertainment & Performance</h3>
        <p class="text-gray-600 mb-4">Models, actors, musicians, dancers, and performers ready for your next big project.</p>
        <button on:click={() => navigate('/talent/discovery')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>Explore Talents</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
      
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">📱</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Digital Marketing</h3>
        <p class="text-gray-600 mb-4">Influencers, content creators, and digital marketing specialists to amplify your brand.</p>
        <button on:click={() => navigate('/talent/discovery')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>Find Experts</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
      
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">🎨</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Creative Media</h3>
        <p class="text-gray-600 mb-4">Photographers, videographers, graphic designers, and creative directors for visual excellence.</p>
        <button on:click={() => navigate('/talent/discovery')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>View Portfolio</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
      
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">🎪</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Event Management</h3>
        <p class="text-gray-600 mb-4">Event coordinators, ushers, MCs, and entertainment specialists for memorable experiences.</p>
        <button on:click={() => navigate('/talent/discovery')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>Book Now</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
      
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">🏢</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Agency Partners</h3>
        <p class="text-gray-600 mb-4">Collaborate with top-tier agencies for comprehensive marketing and advertising solutions.</p>
        <button on:click={() => navigate('/agency')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>Partner With Us</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
      
      <div class="card p-8 hover:shadow-2xl transition-all duration-500 group">
        <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">🎯</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Brand Ambassadors</h3>
        <p class="text-gray-600 mb-4">Professional brand representatives who embody your values and connect with your audience.</p>
        <button on:click={() => navigate('/talent/discovery')} class="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
          <span>Hire Ambassadors</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-24 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20"></div>
  <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
      Ready to Elevate Your Creative Journey?
    </h2>
    <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
      Whether you're a talent looking to showcase your skills or a brand seeking exceptional creativity, 
      FlourishTalents is your gateway to success.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <button on:click={() => navigate('/auth/register')} class="btn-primary text-xl px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
        <span>Join as Talent</span>
        <ArrowRight class="w-5 h-5" />
      </button>
      <button on:click={() => navigate('/client/dashboard')} class="btn-secondary text-xl px-10 py-5 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl">
        Hire Talents
      </button>
    </div>
  </div>
</section>
