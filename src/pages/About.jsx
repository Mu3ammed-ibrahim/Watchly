import {
  Film,
  Tv,
  Users,
  Star,
  Globe,
  Bookmark,
  PlayCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative">
        <img src="/src/assets/movies.jpg" alt="Hero" className="w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>

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
      </header>

      {/* What is Watchly Section */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is Watchly?</h2>
            <p className="text-gray-300 text-lg">
              Watchly is a comprehensive movie and TV show tracking platform
              designed for entertainment enthusiasts. Just like your favorite
              streaming service, but smarter.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Film className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Extensive Library</h3>
              <p className="text-gray-400">
                Access info on thousands of movies and TV shows.
              </p>
            </article>

            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Bookmark className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Personalized Watchlist</h3>
              <p className="text-gray-400">
                Create and manage your watchlist easily.
              </p>
            </article>

            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Star className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>
              <p className="text-gray-400">
                Rate and review, and see what others think.
              </p>
            </article>

            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Tv className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Seamless Streaming</h3>
              <p className="text-gray-400">
                Quickly find which platform streams your content.
              </p>
            </article>

            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Users className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">
                Connect with others and share recommendations.
              </p>
            </article>

            <article className="bg-zinc-900 p-6 rounded transition-transform hover:scale-105">
              <Globe className="text-red-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
              <p className="text-gray-400">
                Use Watchly on desktop, tablet, or mobile.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">
            How Watchly Works
          </h2>

          {/* Step 1 */}
          <article className="flex flex-col md:flex-row items-center mb-24 gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
              <p className="text-gray-300 mb-6">
                Sign up and personalize your Watchly account.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Customize with a photo and bio
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Select genres and platforms
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Import watch history
                </li>
              </ul>
            </div>
            <figure className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <Film size={72} className="text-red-600 opacity-50" />
            </figure>
          </article>

          {/* Step 2 */}
          <article className="flex flex-col md:flex-row-reverse items-center mb-24 gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Discover New Content</h3>
              <p className="text-gray-300 mb-6">
                Get personalized suggestions and explore curated collections.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Recommendations based on your taste
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Curated collections
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Trending content in your favorite genres
                </li>
              </ul>
            </div>
            <figure className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <PlayCircle size={72} className="text-red-600 opacity-50" />
            </figure>
          </article>

          {/* Step 3 */}
          <article className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Track & Share</h3>
              <p className="text-gray-300 mb-6">
                Keep track of watched content and share reviews.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Track watched episodes
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Get notifications for new releases
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Share on social media
                </li>
              </ul>
            </div>
            <figure className="w-full md:w-1/2 bg-zinc-900 aspect-video rounded-lg flex items-center justify-center">
              <Bookmark size={72} className="text-red-600 opacity-50" />
            </figure>
          </article>
        </div>
      </section>
    </main>
  );
}
