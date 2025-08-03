<script lang="ts">
  let activeCategory = 'all';
  
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'acting', name: 'Acting & Theatre' },
    { id: 'modeling', name: 'Modeling & Fashion' },
    { id: 'music', name: 'Music & Performance' },
    { id: 'digital', name: 'Digital Marketing' },
    { id: 'media', name: 'Media Production' }
  ];
  
  const courses = [
    {
      id: 1,
      title: 'Professional Acting Techniques',
      instructor: 'Sarah Mitchell',
      category: 'acting',
      level: 'Intermediate',
      duration: '8 weeks',
      price: '$299',
      rating: 4.9,
      students: 234,
      image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Master the fundamentals of professional acting with industry-proven techniques.'
    },
    {
      id: 2,
      title: 'Fashion Modeling Essentials',
      instructor: 'Marcus Johnson',
      category: 'modeling',
      level: 'Beginner',
      duration: '6 weeks',
      price: '$199',
      rating: 4.8,
      students: 187,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Learn runway techniques, poses, and industry standards for professional modeling.'
    },
    {
      id: 3,
      title: 'Digital Marketing for Creatives',
      instructor: 'Emma Chen',
      category: 'digital',
      level: 'Beginner',
      duration: '10 weeks',
      price: '$399',
      rating: 4.9,
      students: 421,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Build your personal brand and market your creative services effectively online.'
    },
    {
      id: 4,
      title: 'Music Production & Performance',
      instructor: 'David Williams',
      category: 'music',
      level: 'Intermediate',
      duration: '12 weeks',
      price: '$459',
      rating: 4.7,
      students: 156,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Create professional-quality music and develop your performance skills.'
    }
  ];
  
  $: filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);
</script>

<svelte:head>
  <title>MasterClass - FlourishTalents</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
        MasterClass Academy
      </h1>
      <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
        Learn from industry experts and elevate your creative skills with our comprehensive courses. 
        Get certified and unlock new opportunities in your field.
      </p>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Category Filter -->
    <div class="flex flex-wrap gap-4 mb-12 justify-center">
      {#each categories as category}
        <button
          on:click={() => activeCategory = category.id}
          class="px-6 py-3 rounded-lg font-medium transition duration-200 {
            activeCategory === category.id 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }"
        >
          {category.name}
        </button>
      {/each}
    </div>

    <!-- Course Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {#each filteredCourses as course}
        <div class="card overflow-hidden group cursor-pointer">
          <div class="aspect-video overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium">
                {course.level}
              </span>
              <div class="flex items-center space-x-1">
                <span class="text-yellow-400">⭐</span>
                <span class="text-sm text-gray-600">{course.rating}</span>
              </div>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition duration-200">
              {course.title}
            </h3>
            
            <p class="text-gray-600 text-sm mb-4">{course.description}</p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>👤 {course.instructor}</span>
              <span>⏱️ {course.duration}</span>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <span class="text-2xl font-bold text-gray-900">{course.price}</span>
                <div class="text-xs text-gray-500">{course.students} students</div>
              </div>
              <button class="btn-primary text-sm px-4 py-2">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Features Section -->
    <section class="mt-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Our MasterClass?</h2>
        <p class="text-xl text-gray-600">World-class education designed specifically for creative professionals</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="card p-8 text-center">
          <div class="text-4xl mb-4">🎓</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Industry Certification</h3>
          <p class="text-gray-600">Receive recognized certifications that enhance your professional credibility.</p>
        </div>
        
        <div class="card p-8 text-center">
          <div class="text-4xl mb-4">👥</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Expert Instructors</h3>
          <p class="text-gray-600">Learn from successful professionals with years of industry experience.</p>
        </div>
        
        <div class="card p-8 text-center">
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Career Advancement</h3>
          <p class="text-gray-600">Access exclusive opportunities and fast-track your creative career.</p>
        </div>
      </div>
    </section>
  </div>
</div>