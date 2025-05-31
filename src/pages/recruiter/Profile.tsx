
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Users, 
  Briefcase, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Upload,
  Shield,
  Award,
  Calendar
} from 'lucide-react';

const RecruiterProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Technical Recruiter',
    bio: 'Experienced technical recruiter with 8+ years in the tech industry, specializing in software engineering and product roles.',
    location: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    avatar: '/placeholder.svg'
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: 'TechCorp Solutions',
    industry: 'Software Development',
    size: '500-1000',
    founded: '2015',
    website: 'https://techcorp.com',
    description: 'Leading provider of enterprise software solutions helping businesses transform digitally.',
    logo: '/placeholder.svg',
    headquarters: 'San Francisco, CA',
    type: 'Private Company'
  });

  const [departments] = useState([
    { id: '1', name: 'Engineering', headCount: 150, openRoles: 12 },
    { id: '2', name: 'Product', headCount: 45, openRoles: 5 },
    { id: '3', name: 'Design', headCount: 25, openRoles: 3 },
    { id: '4', name: 'Marketing', headCount: 35, openRoles: 4 },
    { id: '5', name: 'Sales', headCount: 80, openRoles: 8 },
    { id: '6', name: 'Operations', headCount: 30, openRoles: 2 }
  ]);

  const [openRoles] = useState([
    { id: '1', title: 'Senior Frontend Developer', department: 'Engineering', level: 'Senior', posted: '2024-01-15' },
    { id: '2', title: 'Product Manager', department: 'Product', level: 'Mid-Level', posted: '2024-01-14' },
    { id: '3', title: 'UX Designer', department: 'Design', level: 'Senior', posted: '2024-01-13' },
    { id: '4', title: 'DevOps Engineer', department: 'Engineering', level: 'Senior', posted: '2024-01-12' },
    { id: '5', title: 'Marketing Specialist', department: 'Marketing', level: 'Junior', posted: '2024-01-11' }
  ]);

  const [certifications] = useState([
    { id: '1', name: 'Certified Talent Acquisition Professional (CTAP)', issuer: 'HRCI', date: '2023', expires: '2026' },
    { id: '2', name: 'LinkedIn Certified Professional Recruiter', issuer: 'LinkedIn', date: '2022', expires: '2025' },
    { id: '3', name: 'Diversity & Inclusion Recruiting Certification', issuer: 'SHRM', date: '2023', expires: '2026' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HireAI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant={isEditing ? "default" : "outline"} 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Recruiter Profile</h1>
            <p className="text-gray-600">Maintain your professional profile to ensure credibility and trust</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="company">Company Details</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="roles">Open Roles</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your professional details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={personalInfo.avatar} />
                      <AvatarFallback className="text-xl">
                        {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={personalInfo.bio}
                      onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                    <Input
                      id="linkedIn"
                      value={personalInfo.linkedIn}
                      onChange={(e) => setPersonalInfo({...personalInfo, linkedIn: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Details about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                    {isEditing && (
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={companyInfo.industry} onValueChange={(value) => setCompanyInfo({...companyInfo, industry: value})} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software Development">Software Development</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select value={companyInfo.size} onValueChange={(value) => setCompanyInfo({...companyInfo, size: value})} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500-1000">500-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="founded">Founded</Label>
                      <Input
                        id="founded"
                        value={companyInfo.founded}
                        onChange={(e) => setCompanyInfo({...companyInfo, founded: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyInfo.website}
                        onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="headquarters">Headquarters</Label>
                      <Input
                        id="headquarters"
                        value={companyInfo.headquarters}
                        onChange={(e) => setCompanyInfo({...companyInfo, headquarters: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Departments</CardTitle>
                      <CardDescription>Organizational structure and team information</CardDescription>
                    </div>
                    {isEditing && (
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Department
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept) => (
                      <Card key={dept.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{dept.name}</h3>
                            {isEditing && (
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{dept.headCount} employees</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span>{dept.openRoles} open roles</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Open Roles</CardTitle>
                      <CardDescription>Current job openings across your organization</CardDescription>
                    </div>
                    {isEditing && (
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Role
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {openRoles.map((role) => (
                      <div key={role.id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{role.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <Badge variant="outline">{role.department}</Badge>
                            <Badge variant="outline">{role.level}</Badge>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Posted {role.posted}
                            </span>
                          </div>
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Verification Status</span>
                    </CardTitle>
                    <CardDescription>Verify your credentials to build trust with candidates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Email Verified</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Phone Verified</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium">Company Domain</span>
                      </div>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm font-medium">LinkedIn Profile</span>
                      </div>
                      <Button variant="outline" size="sm">Verify</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Certifications</span>
                    </CardTitle>
                    <CardDescription>Professional certifications and qualifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm">{cert.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">Issued by {cert.issuer}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">Issued: {cert.date}</span>
                          <span className="text-xs text-gray-500">Expires: {cert.expires}</span>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
