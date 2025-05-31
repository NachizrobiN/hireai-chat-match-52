
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Upload, MessageSquare, Star, MapPin, Calendar, Briefcase, BarChart3, Brain, Menu, Settings, LogOut, ChevronDown, Plus, X, Users, Target, Clock, Heart, Phone, Mail, UserCheck, ChevronUp } from 'lucide-react';
import AnalyticsDashboard from '@/components/recruiter/AnalyticsDashboard';
import PreScreeningSystem from '@/components/recruiter/candidate-ranking/PreScreeningSystem';
import PersonalizedOutreach from '@/components/recruiter/candidate-ranking/PersonalizedOutreach';
import WorkflowManagement from '@/components/recruiter/candidate-ranking/WorkflowManagement';

const RecruiterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([]);
  const [shortlistedCandidates, setShortlistedCandidates] = useState<string[]>([]);

  const [workflows] = useState([
    { id: '1', name: 'Frontend Developer Hiring', stage: 'Screening', candidates: 12 },
    { id: '2', name: 'Backend Engineer Pipeline', stage: 'Interview', candidates: 8 },
    { id: '3', name: 'Product Manager Search', stage: 'Offer', candidates: 3 },
    { id: '4', name: 'UX Designer Outreach', stage: 'Sourcing', candidates: 15 },
  ]);

  const [mockCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      experience: '5 years',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      score: 95,
      avatar: '/placeholder.svg',
      summary: 'Experienced frontend developer with expertise in React ecosystem and modern web technologies.',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 123-4567',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Full Stack Engineer',
      experience: '4 years',
      location: 'Austin, TX',
      skills: ['React', 'Python', 'PostgreSQL', 'AWS'],
      score: 92,
      avatar: '/placeholder.svg',
      summary: 'Full-stack engineer with strong background in modern web applications and cloud infrastructure.',
      email: 'michael.r@email.com',
      phone: '+1 (555) 234-5678',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'Frontend Developer',
      experience: '3 years',
      location: 'Seattle, WA',
      skills: ['React', 'JavaScript', 'CSS', 'Redux'],
      score: 88,
      avatar: '/placeholder.svg',
      summary: 'Creative frontend developer passionate about user experience and modern web design.',
      email: 'emily.johnson@email.com',
      phone: '+1 (555) 345-6789',
      status: 'Considering'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'React Developer',
      experience: '6 years',
      location: 'New York, NY',
      skills: ['React', 'Next.js', 'TypeScript', 'MongoDB'],
      score: 94,
      avatar: '/placeholder.svg',
      summary: 'Senior React developer with extensive experience in building scalable web applications.',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Available'
    }
  ]);

  const quickFilters = [
    { name: 'Frontend', count: 24, active: false },
    { name: 'Backend', count: 18, active: false },
    { name: 'Full Stack', count: 15, active: false },
    { name: 'Remote', count: 42, active: false },
    { name: 'Senior', count: 12, active: false },
    { name: 'Available', count: 38, active: false },
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    
    let results = mockCandidates;
    
    if (searchQuery.trim()) {
      results = mockCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilters.length > 0) {
      results = results.filter(candidate => 
        selectedFilters.some(filter => 
          candidate.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
          candidate.role.toLowerCase().includes(filter.toLowerCase()) ||
          candidate.status.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    
    setFilteredCandidates(results);
  };

  const toggleFilter = (filterName: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  const toggleShortlist = (candidateId: string) => {
    setShortlistedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const candidatesToShow = searchQuery || selectedFilters.length > 0 ? filteredCandidates : mockCandidates;

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
            <span className="text-sm text-gray-600">Welcome back, Recruiter!</span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => window.location.href = '/recruiter/profile'}>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/login'}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Workflows</h2>
            <Collapsible open={workflowsOpen} onOpenChange={setWorkflowsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <span className="text-sm font-medium">Active Workflows ({workflows.length})</span>
                  {workflowsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium truncate">{workflow.name}</h4>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{workflow.stage}</span>
                      <span>{workflow.candidates} candidates</span>
                    </div>
                  </Card>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  New Workflow
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Bulk Actions
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Set Goals
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="search" className="flex-1 flex flex-col">
            <div className="border-b bg-white px-6 py-4">
              <TabsList className="grid w-full max-w-3xl grid-cols-4">
                <TabsTrigger value="search" className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Search Candidates</span>
                </TabsTrigger>
                <TabsTrigger value="outreach" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Outreach</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="ai-tools" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Tools</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="search" className="flex-1 flex flex-col">
              {/* Search Section */}
              <div className="p-6 bg-white border-b">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Candidate</h1>
                  
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Try: 'React developer with 3+ years experience in fintech'"
                        className="pl-10 h-12 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button variant="outline" className="h-12 px-6">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload JD
                    </Button>
                    <Button onClick={handleSearch} className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                      Search
                    </Button>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-2">
                    {quickFilters.map((filter, index) => (
                      <Badge
                        key={index}
                        variant={selectedFilters.includes(filter.name) ? "default" : "outline"}
                        className={`cursor-pointer hover:bg-gray-100 ${
                          selectedFilters.includes(filter.name) ? 'bg-blue-600 text-white' : ''
                        }`}
                        onClick={() => toggleFilter(filter.name)}
                      >
                        {filter.name} ({filter.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedFilters.length > 0 || searchQuery ? 'Search Results' : 'Top Candidates'} ({candidatesToShow.length} found)
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Sorted by match score</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {candidatesToShow.map((candidate) => (
                      <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-blue-200">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={candidate.avatar} />
                                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{candidate.name}</CardTitle>
                                <CardDescription className="flex items-center space-x-4 text-sm">
                                  <span className="flex items-center">
                                    <Briefcase className="w-3 h-3 mr-1" />
                                    {candidate.role}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {candidate.experience}
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={shortlistedCandidates.includes(candidate.id.toString()) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleShortlist(candidate.id.toString())}
                              >
                                <Heart className={`w-4 h-4 ${shortlistedCandidates.includes(candidate.id.toString()) ? 'fill-current' : ''}`} />
                              </Button>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{candidate.score}%</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">{candidate.summary}</p>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{candidate.location}</span>
                            <Badge variant="outline" className={`ml-auto ${
                              candidate.status === 'Available' ? 'text-green-600 border-green-200' : 
                              candidate.status === 'Considering' ? 'text-yellow-600 border-yellow-200' : 
                              'text-gray-600 border-gray-200'
                            }`}>
                              {candidate.status}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <UserCheck className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4 mr-2" />
                              {candidate.phone}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outreach" className="flex-1 overflow-y-auto">
              <Tabs defaultValue="prescreening" className="h-full">
                <div className="border-b bg-white px-6 py-4">
                  <TabsList className="grid w-full max-w-2xl grid-cols-3">
                    <TabsTrigger value="prescreening">Pre-Screening</TabsTrigger>
                    <TabsTrigger value="outreach">Outreach</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="prescreening" className="p-6">
                  <PreScreeningSystem />
                </TabsContent>

                <TabsContent value="outreach" className="p-6">
                  <PersonalizedOutreach />
                </TabsContent>

                <TabsContent value="workflow" className="p-6">
                  <WorkflowManagement />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 p-6 overflow-y-auto">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="ai-tools" className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Tools</h1>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Parser</CardTitle>
                      <CardDescription>Extract structured data from resumes automatically</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Resumes
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Assessment</CardTitle>
                      <CardDescription>AI-powered technical and soft skill evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Brain className="w-4 h-4 mr-2" />
                        Create Assessment
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interview Questions</CardTitle>
                      <CardDescription>Generate customized questions based on role and candidate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Generate Questions
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bias Detection</CardTitle>
                      <CardDescription>Ensure fair and unbiased hiring practices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Analyze Process
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
