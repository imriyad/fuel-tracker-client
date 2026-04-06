import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

export default function TailwindDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tailwind CSS Components Demo
        </h1>
        <p className="text-gray-600">
          Explore the reusable UI components built with Tailwind CSS
        </p>
      </div>

      {/* Buttons Section */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Buttons</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" isLoading>Loading...</Button>
            <Button variant="danger" disabled>Disabled</Button>
          </div>
        </div>
      </Card>

      {/* Inputs Section */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Fields</h2>
        <div className="space-y-4 max-w-md">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            helperText="We'll never share your email"
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          
          <Input
            label="Search"
            type="text"
            placeholder="Search..."
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <Input
            label="Error Example"
            type="text"
            placeholder="This field has an error"
            error="This field is required"
          />
        </div>
      </Card>

      {/* Cards Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card padding="sm">
            <h3 className="font-semibold text-gray-900 mb-2">Small Padding</h3>
            <p className="text-gray-600 text-sm">
              This card has small padding (p-4).
            </p>
          </Card>
          
          <Card padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Medium Padding</h3>
            <p className="text-gray-600">
              This card has medium padding (p-6).
            </p>
          </Card>
          
          <Card padding="lg">
            <h3 className="font-semibold text-gray-900 mb-2">Large Padding</h3>
            <p className="text-gray-600">
              This card has large padding (p-8).
            </p>
          </Card>
        </div>
      </div>

      {/* Color Palette */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Color Palette</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Primary Colors (Blue)</h3>
            <div className="flex flex-wrap gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                <div
                  key={shade}
                  className={`w-16 h-16 rounded-lg bg-primary-${shade} flex items-center justify-center text-xs font-medium ${
                    parseInt(shade) < 400 ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Accent Colors (Purple)</h3>
            <div className="flex flex-wrap gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                <div
                  key={shade}
                  className={`w-16 h-16 rounded-lg bg-accent-${shade} flex items-center justify-center text-xs font-medium ${
                    parseInt(shade) < 400 ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}