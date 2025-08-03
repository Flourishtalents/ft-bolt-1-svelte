<script lang="ts">
  import { user, isAuthenticated } from '$lib/stores/auth';
  
  let isMember = false;
  let showJoinForm = false;
  
  const events = [
    {
      title: 'Monthly Networking Mixer',
      date: '2025-02-15',
      time: '6:00 PM',
      location: 'Lagos Creative Hub',
      type: 'Networking',
      attendees: 45
    },
    {
      title: 'Photography Workshop',
      date: '2025-02-22',
      time: '2:00 PM',
      location: 'Online',
      type: 'Workshop',
      attendees: 32
    },
    {
      title: 'Brand Collaboration Showcase',
      date: '2025-03-01',
      time: '7:00 PM',
      location: 'Victoria Island, Lagos',
      type: 'Showcase',
      attendees: 78
    }
  ];
  
  const benefits = [
    'Exclusive networking events and mixers',
    'Priority access to masterclasses and workshops',
    'Direct mentorship opportunities',
    'Collaborative projects and team building',
    'Members-only merchandise and discounts',
    'Career guidance and consultation sessions',
    'Access to premium job opportunities',
    'Community outreach and volunteer programs'
  ];
</script>

<svelte:head>
  <title>FlourishTalents Club - Community</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
        FlourishTalents Club
      </h1>
      <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
        Join an exclusive community of creative talents. Connect, collaborate, and grow together 
        while making lasting impact in the creative industry.
      </p>
      {#if $isAuthenticated}
        {#if !isMember}
          <button 
            on:click={() => showJoinForm = true}
            class="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Join the Club
          </button>
        {:else}
          <div class="bg-white/10 rounded-lg p-6 inline-block">
            <p class="text-white font-medium">Welcome back, club member! 🎉</p>
          </div>
        {/if}
      {:else}
        <a href="/auth/register" class="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
          Join the Club
        </a>
      {/if}
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Club Benefits -->
    <section class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
        <p class="text-xl text-gray-600">Unlock exclusive opportunities and resources designed for your creative growth</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each benefits as benefit}
          <div class="card p-6 text-center">
            <div class="text-2xl mb-3">✨</div>
            <p class="text-gray-700 font-medium">{benefit}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="mb-16">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Upcoming Events</h2>
        <button class="btn-primary">View All Events</button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each events as event}
          <div class="card p-6">
            <div class="flex justify-between items-start mb-4">
              <span class="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {event.type}
              </span>
              <span class="text-sm text-gray-500">{event.attendees} attending</span>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-3">{event.title}</h3>
            
            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex items-center space-x-2">
                <span>📅</span>
                <span>{event.date}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>⏰</span>
                <span>{event.time}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
            </div>
            
            <button class="btn-primary w-full">
              {isMember ? 'Register Now' : 'Join Club to Register'}
            </button>
          </div>
        {/each}
      </div>
    </section>

    <!-- Community Features -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Projects & Collaborations -->
      <div class="card p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Projects & Collaborations</h3>
        <p class="text-gray-600 mb-6">
          Participate in exciting collaborative projects, from marketing campaigns to creative showcases. 
          Work with fellow members and industry partners.
        </p>
        <div class="space-y-4">
          <div class="border-l-4 border-primary-600 pl-4">
            <h4 class="font-semibold text-gray-900">Active Project: Youth Empowerment Campaign</h4>
            <p class="text-sm text-gray-600">15 members collaborating • Due: March 15, 2025</p>
          </div>
          <div class="border-l-4 border-secondary-600 pl-4">
            <h4 class="font-semibold text-gray-900">Upcoming: Fashion Week Showcase</h4>
            <p class="text-sm text-gray-600">Registration opens February 20 • 50 spots available</p>
          </div>
        </div>
        <button class="btn-primary mt-6">View All Projects</button>
      </div>

      <!-- Mentorship & Growth -->
      <div class="card p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Mentorship & Growth</h3>
        <p class="text-gray-600 mb-6">
          Connect with industry veterans and experienced professionals who can guide your creative journey 
          and help you reach new heights.
        </p>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">MJ</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900">Maria Johnson</p>
              <p class="text-sm text-gray-600">Fashion Industry Veteran • 15+ years</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 bg-secondary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">DK</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900">David Kim</p>
              <p class="text-sm text-gray-600">Creative Director • Marketing Expert</p>
            </div>
          </div>
        </div>
        <button class="btn-primary mt-6">Find a Mentor</button>
      </div>
    </section>
  </div>

  <!-- Join Club Modal -->
  {#if showJoinForm}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="card p-8 w-full max-w-md">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Join FlourishTalents Club</h3>
        <p class="text-gray-600 mb-6">
          Ready to connect with an amazing community of creative talents? 
          Complete your membership application below.
        </p>
        
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Why do you want to join?</label>
            <textarea rows="3" class="input-field" placeholder="Tell us about your goals and interests..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-primary-600" />
                <span class="ml-2">Networking</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-primary-600" />
                <span class="ml-2">Mentorship</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-primary-600" />
                <span class="ml-2">Projects</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-primary-600" />
                <span class="ml-2">Learning</span>
              </label>
            </div>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button 
              type="button"
              on:click={() => showJoinForm = false}
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              on:click={() => {
                isMember = true;
                showJoinForm = false;
              }}
              class="btn-primary flex-1"
            >
              Join Club
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>