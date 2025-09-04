'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Brain, 
  Camera, 
  TrendingUp, 
  Truck, 
  Sprout, 
  Zap, 
  Target, 
  BarChart3,
  Satellite,
  CloudRain,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-4 bg-green-600 hover:bg-green-700">
              Early Stage Startup
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Farm
              <span className="text-green-600"> Technology</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Revolutionizing agriculture with cutting-edge AI technology. Our early-stage startup 
              combines artificial intelligence with deep agricultural expertise to empower farmers 
              and optimize the entire supply chain.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/80">
                Seed Stage Ready
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/80">
                AgriTech + AI
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/80">
                Scalable Platform
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our AI Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four core AI systems working together to transform the agricultural ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* AI Freshness Detection */}
            <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">AI Freshness Detection</CardTitle>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      99.5% Accuracy
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Computer Vision Models:</span>
                    <p className="text-gray-600 text-sm mt-1">99.5% accuracy in quality assessment using advanced image recognition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Real-time Scanning:</span>
                    <p className="text-gray-600 text-sm mt-1">EfficientNetB5 + OpenCV + TensorFlow Lite for instant analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Quality Grading:</span>
                    <p className="text-gray-600 text-sm mt-1">Automated color, texture, and ripeness analysis</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                  <p className="text-sm text-green-800">
                    <strong>Impact:</strong> Reduces food waste by 40% and ensures premium pricing for high-quality produce
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Pricing Engine */}
            <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">AI Pricing Engine</CardTitle>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      Smart Optimization
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Dynamic Pricing:</span>
                    <p className="text-gray-600 text-sm mt-1">Real-time adjustment based on 8+ market factors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Demand Forecasting:</span>
                    <p className="text-gray-600 text-sm mt-1">7-14 day prediction accuracy for optimal inventory</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Competitor Analysis:</span>
                    <p className="text-gray-600 text-sm mt-1">Automatic price optimization against market rates</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                  <p className="text-sm text-green-800">
                    <strong>Impact:</strong> Increases farmer revenue by 60-70% through optimal pricing strategies
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Logistics Optimization */}
            <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">AI Logistics Optimization</CardTitle>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      Efficiency Boost
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Route Optimization:</span>
                    <p className="text-gray-600 text-sm mt-1">25% delivery time reduction through smart routing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Predictive Maintenance:</span>
                    <p className="text-gray-600 text-sm mt-1">40% vehicle downtime reduction with AI monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Real-time Tracking:</span>
                    <p className="text-gray-600 text-sm mt-1">IoT + GPS integration for complete visibility</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                  <p className="text-sm text-green-800">
                    <strong>Impact:</strong> Reduces operational costs by 30% while improving delivery speed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Farmer AI Support */}
            <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">Farmer AI Support</CardTitle>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      Crop Intelligence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Satellite className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Crop Health Monitoring:</span>
                    <p className="text-gray-600 text-sm mt-1">Drone + satellite imagery analysis for early detection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Yield Prediction:</span>
                    <p className="text-gray-600 text-sm mt-1">80% accuracy improvement in harvest forecasting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CloudRain className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Weather Integration:</span>
                    <p className="text-gray-600 text-sm mt-1">Hyper-local forecasting for optimal farming decisions</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                  <p className="text-sm text-green-800">
                    <strong>Impact:</strong> Increases crop yields by 25% through data-driven insights
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Development Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Skilled developers with expertise in modern web technologies and agricultural solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">FS</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Full-Stack Development</h3>
                <p className="text-green-600 font-semibold">Frontend & Backend</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">AI</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Integration</h3>
                <p className="text-green-600 font-semibold">Machine Learning</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">DB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Database Design</h3>
                <p className="text-green-600 font-semibold">Data Architecture</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Market Opportunity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Massive addressable market with significant growth potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">₹850B+</div>
              <div className="text-gray-600 font-medium">Indian Fresh Food Market</div>
              <div className="text-sm text-gray-500 mt-1">Massive addressable market</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">75-100%</div>
              <div className="text-gray-600 font-medium">Quick Commerce Growth</div>
              <div className="text-sm text-gray-500 mt-1">Year-over-year expansion</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10%</div>
              <div className="text-gray-600 font-medium">Digitized Farmers</div>
              <div className="text-sm text-gray-500 mt-1">Huge untapped potential</div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/investors">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Learn More About Partnership
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
