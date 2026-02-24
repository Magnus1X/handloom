import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-earth-cream/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-earth-brown">Terms & Conditions</CardTitle>
              <p className="text-earth-brown/70">Last updated: December 2024</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-6 text-earth-brown/80">
                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Acceptance of Terms</h2>
                  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Use License</h2>
                  <p>Permission is granted to temporarily download one copy of the materials on House of Homegrown's website for personal, non-commercial transitory viewing only.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Product Information</h2>
                  <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Orders and Payment</h2>
                  <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Limitation of Liability</h2>
                  <p>House of Homegrown shall not be liable for any damages arising from the use or inability to use our products or services.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Contact Information</h2>
                  <p>For questions about these Terms & Conditions, please contact us at hello@houseofhomegrown.com</p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;