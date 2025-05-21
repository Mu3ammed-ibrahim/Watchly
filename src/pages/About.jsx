import {
  Film,
  Tv,
  Users,
  Star,
  Globe,
  Shield,
  Bookmark,
  PlayCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img src="/src/assets/movies.jpg" alt="Hero" className="w-full " />
        {/* Hero Background - Netflix style gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20">
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About Watchly
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your personal guide to discover, track, and enjoy movies and TV
              shows all in one place.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded inline-flex items-center font-medium transition-colors">
              <PlayCircle className="mr-2" size={20} />
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* What is Watchly Section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is Watchly?</h2>
            <p className="text-gray-300 text-lg">
              Watchly is a comprehensive movie and TV show tracking platform
              designed for entertainment enthusiasts. Just like your favorite
              streaming service, but smarter - Watchly helps you organize what
              you watch, discover new content based on your preferences, and
              connect with a community of like-minded viewers.
            </p>
          </div>

          {/* Features Grid - Netflix card style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Film className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Extensive Library</h3>
              <p className="text-gray-400">
                Access information on thousands of movies and TV shows, from the
                latest blockbusters to hidden gems and classics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Bookmark className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Personalized Watchlist</h3>
              <p className="text-gray-400">
                Create and manage your watchlist with ease. Keep track of what
                you've watched and what's next on your list.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Star className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>
              <p className="text-gray-400">
                Rate and review what you watch, and see what others think. Build
                a profile that reflects your taste in entertainment.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Tv className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Seamless Streaming</h3>
              <p className="text-gray-400">
                Instantly see which services are streaming your favorite
                content, so you can start watching with just one click.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Users className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">
                Connect with friends and follow users with similar tastes. Share
                recommendations and discover new content together.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Globe className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
              <p className="text-gray-400">
                Access Watchly on any device - desktop, tablet, or mobile. Your
                watchlist stays synced everywhere you go.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Netflix style alternating panels */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">
            How Watchly Works
          </h2>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center mb-24 gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
              <p className="text-gray-300 mb-6">
                Sign up for Watchly in seconds. Tell us what genres you love,
                your favorite actors, directors, and more. We'll use this to
                personalize your experience.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Customize your profile with a photo and bio
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Select your favorite genres and streaming services
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Import your watch history from popular platforms
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <Film size={72} className="text-red-600 opacity-50" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-24 gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Discover New Content</h3>
              <p className="text-gray-300 mb-6">
                Our smart recommendation engine learns from your ratings and
                watching habits to suggest movies and shows you'll love. No more
                endless scrolling trying to find something to watch.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Personalized recommendations based on your taste
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Curated collections from movie experts
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  See what's trending in your favorite genres
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <PlayCircle size={72} className="text-red-600 opacity-50" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Track & Share</h3>
              <p className="text-gray-300 mb-6">
                Mark what you've watched, rate content, and leave reviews. Share
                your thoughts with friends or keep them private. Your watchlist
                becomes your personal entertainment journal.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Keep track of episodes you've watched 
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Get notifications for new episodes and releases
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Share your reviews on social media
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <Bookmark size={72} className="text-red-600 opacity-50" />
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
