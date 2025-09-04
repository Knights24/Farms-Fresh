'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  TrendingUp, 
  Users, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  ExternalLink
} from 'lucide-react';

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-4 bg-green-600 hover:bg-green-700">
              Portfolio Project
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Farms Fresh
              <span className="text-green-600"> Project</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              A comprehensive agricultural e-commerce platform demonstrating modern web development skills, 
              AI integration, and cloud deployment capabilities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/90 text-green-800 border-green-200">
                Full-Stack Development
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/90 text-green-800 border-green-200">
                AgriTech + AI Demo
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4 bg-white/90 text-green-800 border-green-200">
                Portfolio Project
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">₹850B+</div>
                <p className="text-gray-600">Indian Fresh Food Market</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">75-100%</div>
                <p className="text-gray-600">Quick Commerce Growth</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">10%</div>
                <p className="text-gray-600">Digitized Farmers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">60-70%</div>
                <p className="text-gray-600">Farmer Revenue Share</p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• ₹850+ billion Indian fresh food market</li>
                  <li>• Quick commerce growing 75-100% YoY</li>
                  <li>• Only 10% farmers digitized - huge potential</li>
                  <li>• Government support for AgriTech</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Development Team</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Full-Stack Development</strong> - Next.js & TypeScript</li>
                  <li>• <strong>AI Integration</strong> - Machine Learning Solutions</li>
                  <li>• <strong>Database Architecture</strong> - MongoDB & Cloud Systems</li>
                  <li>• Modern web technologies and agricultural solutions</li>
                  <li>• Strong technical implementation and scalable design</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <Building className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Technology Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• 99.5% AI freshness detection accuracy</li>
                  <li>• Smart pricing optimization</li>
                  <li>• Logistics efficiency improvement</li>
                  <li>• Scalable technology platform</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
                <p className="text-gray-600 text-center">
                  Interested in learning more? We'd love to discuss the opportunity with you.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Company/Fund Name" />
                <Input placeholder="Investment Range" />
                <Textarea 
                  placeholder="Message - Tell us about your investment thesis and how we can work together"
                  rows={4}
                />
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
                
                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>We typically respond within 24 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Development Team</h3>
                  <p className="text-gray-600 mb-4">Technical Skills</p>
                  <div className="grid grid-cols-1 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-gray-900">Full-Stack Development</h4>
                      <p className="text-sm text-green-600">Next.js & TypeScript</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-gray-900">AI Integration</h4>
                      <p className="text-sm text-green-600">Machine Learning</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-gray-900">Database Design</h4>
                      <p className="text-sm text-green-600">MongoDB Atlas</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">project@farmfresh.demo</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Portfolio Project</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Web Development Project</span>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Project Details</h4>
                    <p className="text-sm text-green-700">
                      Full-stack agricultural e-commerce platform<br/>
                      Demonstrating modern web development skills
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="font-bold text-gray-900 mb-4">Project Resources</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Pitch Deck (Available on Request)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Financial Projections
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Technology Demo
                    </Button>
                  </div>
                </div>

                <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-lg border border-green-200/50">
                  <h4 className="font-bold text-green-800 mb-2">Platform Status</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Status: Live production platform</li>
                    <li>• Stage: Growth-ready technology</li>
                    <li>• Market: Gujarat operations → Multi-city expansion</li>
                    <li>• Timeline: Scaling operations and partnerships</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-green-600 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Indian Agriculture?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in building the future of farming with AI. Together, we can empower 
              farmers, feed India, and create a sustainable agricultural ecosystem.
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Let's schedule a call to discuss the opportunity</strong>
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
