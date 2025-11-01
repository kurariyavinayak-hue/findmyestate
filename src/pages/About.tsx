import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Home, Target, Users, Award } from 'lucide-react';
import aniketImage from '@/assets/aniket-agrawal.jpg';
import parasImage from '@/assets/paras-paterya.jpg';
import amitImage from '@/assets/amit-shivhare.jpg';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FindMyEstate</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting property buyers and sellers through a seamless, transparent, and user-friendly platform
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
                At FindMyEstate, we believe that finding your dream property or connecting with the right buyer should be simple, transparent, and accessible to everyone. Our platform eliminates the complexity of real estate transactions by providing a direct connection between buyers and sellers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the most trusted real estate platform, making property transactions simple and transparent for everyone.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Award className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      Transparency, trust, and innovation drive everything we do. We're committed to putting our users first.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                <p className="text-muted-foreground">
                  Access thousands of properties across various locations and price ranges
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
                <p className="text-muted-foreground">
                  Connect directly with property owners without intermediaries
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
                <p className="text-muted-foreground">
                  All properties are verified to ensure quality and authenticity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  FindMyEstate was founded in 2024 with a simple goal: to make real estate transactions easier and more accessible for everyone. We recognized that the traditional real estate process was often complicated, expensive, and time-consuming.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our team of real estate professionals and technology experts came together to create a platform that puts the power back in the hands of buyers and sellers. By leveraging modern technology and user-centered design, we've built a marketplace where property transactions can happen seamlessly.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, thousands of users trust FindMyEstate to help them find their dream properties or connect with serious buyers. We're proud to be part of their journey and continue to innovate to make the experience even better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developers Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Developers</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                The talented team behind FindMyEstate who bring the vision to life through innovative technology and design
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Aniket Agrawal */}
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-8">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={aniketImage} alt="Aniket Agrawal" className="object-cover" />
                      <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">Aniket Agrawal</h3>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </CardContent>
                </Card>

                {/* Paras Mani Paterya */}
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-8">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={amitImage} alt="Paras Mani Paterya" className="object-cover" />
                      <AvatarFallback>PP</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">Paras Mani Paterya</h3>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </CardContent>
                </Card>

                {/* Amit Kumar Shivhare */}
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-8">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={parasImage} alt="Amit Kumar Shivhare" className="object-cover" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">Amit Kumar Shivhare</h3>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
