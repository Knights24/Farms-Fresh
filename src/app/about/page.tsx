'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Truck, Award, Heart, Star } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌱 About Farm Fresh
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for fresh, organic produce delivered straight from local farms to your doorstep. 
            Quality guaranteed, freshness assured.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Farm Fresh, we believe everyone deserves access to the freshest, highest-quality produce. 
              We work directly with local farmers to bring you seasonal fruits and vegetables at their peak 
              flavor and nutritional value.
            </p>
            <p className="text-gray-600">
              Our commitment goes beyond just delivering fresh food – we're building stronger communities, 
              supporting local agriculture, and promoting sustainable farming practices that benefit both 
              people and the planet.
            </p>
          </div>
          <div className="relative h-64 lg:h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <Leaf className="h-24 w-24 text-green-600" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fresh & Organic</h3>
                <p className="text-gray-600">
                  100% organic produce sourced directly from certified local farms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-gray-600">
                  Supporting local farmers and building stronger food communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Farm-to-door delivery within 24 hours to ensure maximum freshness
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Promise</h3>
                <p className="text-gray-600">
                  100% satisfaction guarantee or your money back, no questions asked
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-64 lg:h-80 bg-gradient-to-br from-yellow-100 to-green-100 rounded-lg flex items-center justify-center">
            <Heart className="h-24 w-24 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in Gujarat, India, Farm Fresh started with a simple idea: what if everyone could enjoy 
              the same fresh, delicious produce that farmers feed their own families?
            </p>
            <p className="text-gray-600 mb-4">
              We began by partnering with small family farms in the fertile regions around Ahmedabad, 
              creating a direct connection between growers and consumers that eliminates middlemen and 
              ensures fair prices for both farmers and customers.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of families across Gujarat, delivering not just fresh 
              produce, but also the peace of mind that comes from knowing exactly where your food comes from.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vivek Vishwakarma</h3>
                <p className="text-green-600 font-medium mb-2">Founder & CEO</p>
                <p className="text-gray-600">
                  Passionate about sustainable agriculture and connecting communities through fresh food.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Farm Partners</h3>
                <p className="text-green-600 font-medium mb-2">Local Growers</p>
                <p className="text-gray-600">
                  Dedicated farmers from across Gujarat who share our commitment to quality and sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery Team</h3>
                <p className="text-green-600 font-medium mb-2">Logistics Heroes</p>
                <p className="text-gray-600">
                  Our reliable delivery team ensures your fresh produce arrives quickly and safely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience Farm Fresh?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied customers who trust us for their daily fresh produce needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-5 w-5 text-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="ml-2">4.9/5 from 2000+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
