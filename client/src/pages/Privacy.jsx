import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-earth-cream/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-earth-brown">Privacy Policy</CardTitle>
              <p className="text-earth-brown/70">Last updated: December 2024</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-6 text-earth-brown/80">
                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Information We Collect</h2>
                  <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">How We Use Your Information</h2>
                  <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Information Sharing</h2>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Data Security</h2>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at hello@houseofhomegrown.com</p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;