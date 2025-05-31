
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, MapPin, Briefcase, GraduationCap, Heart, Phone, Mail, 
  MessageSquare, UserCheck, Eye, Calendar, Clock, CheckCircle, 
  AlertTriangle, ExternalLink, FileText, Users, Target, Lightbulb 
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  title: string;
  experience: string;
  skills: string[];
  education: string;
  company: string;
  matchScore: number;
  avatar?: string;
  summary: string;
  status: 'new' | 'shortlisted' | 'screened' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  source: string;
  appliedDate: string;
  lastContact?: string;
  availability: string;
  seniorityLevel: string;
  topMatchedSkills: string[];
  skillGaps: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  aiInsight: string;
  matchReasons: string[];
  considerations: string[];
}

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string) => void;
  onShortlist: (candidateId: string) => void;
  isShortlisted: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  onShortlist,
  isShortlisted
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500 text-white';
    if (score >= 70) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-yellow-100 text-yellow-800',
      screened: 'bg-purple-100 text-purple-800',
      interviewing: 'bg-orange-100 text-orange-800',
      offer: 'bg-green-100 text-green-800',
      hired: 'bg-green-200 text-green-900',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-blue-200 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Checkbox for bulk actions */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(candidate.id)}
              className="rounded w-4 h-4"
            />
            <Avatar className="w-12 h-12">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-3">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <Drawer open={isExpanded} onOpenChange={setIsExpanded}>
                    <DrawerTrigger asChild>
                      <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                        {candidate.name}
                      </h3>
                    </DrawerTrigger>
                    
                    <DrawerContent className="max-h-[90vh]">
                      <DrawerHeader>
                        <DrawerTitle className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback className="text-lg">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-2xl font-bold">{candidate.name}</h2>
                            <p className="text-gray-600">{candidate.title} at {candidate.company}</p>
                          </div>
                        </DrawerTitle>
                      </DrawerHeader>

                      <div className="p-6 overflow-y-auto">
                        <Tabs defaultValue="overview" className="space-y-6">
                          <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="skills">Skills Deep Dive</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="notes">Notes & History</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Contact Information</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">{candidate.email}</span>
                                  </div>
                                  {candidate.phone && (
                                    <div className="flex items-center space-x-2">
                                      <Phone className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm">{candidate.phone}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">{candidate.location}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Match Explanation Box */}
                              <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Target className="w-5 h-5 text-blue-600" />
                                  <h4 className="font-semibold text-blue-800">Match Analysis</h4>
                                  <Badge className={`${getMatchScoreColor(candidate.matchScore)} ml-auto`}>
                                    {candidate.matchScore}% Match
                                  </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="text-sm font-medium text-green-600 mb-1">Top Reasons for Match:</h5>
                                    <ul className="text-sm space-y-1">
                                      {candidate.matchReasons.map((reason, index) => (
                                        <li key={index} className="flex items-start space-x-1">
                                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span>{reason}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {candidate.considerations.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-medium text-orange-600 mb-1">Areas for Consideration:</h5>
                                      <ul className="text-sm space-y-1">
                                        {candidate.considerations.map((consideration, index) => (
                                          <li key={index} className="flex items-start space-x-1">
                                            <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                            <span>{consideration}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="flex items-start space-x-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-blue-800">AI Insight</p>
                                  <p className="text-sm text-blue-700">{candidate.aiInsight}</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="experience" className="space-y-4">
                            <div className="space-y-4">
                              <h4 className="font-semibold">Professional Experience</h4>
                              <div className="bg-white rounded-lg border p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h5 className="font-medium">{candidate.title}</h5>
                                    <p className="text-gray-600">{candidate.company}</p>
                                  </div>
                                  <Badge variant="outline">{candidate.experience}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{candidate.summary}</p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.slice(0, 8).map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="skills" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-green-600 mb-3">Matched Skills</h4>
                                <div className="space-y-2">
                                  {candidate.topMatchedSkills.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                                      <span className="text-sm font-medium">{skill}</span>
                                      <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600">Strong Match</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {candidate.skillGaps.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-orange-600 mb-3">Skill Gaps</h4>
                                  <div className="space-y-2">
                                    {candidate.skillGaps.map((skill, index) => (
                                      <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                                        <span className="text-sm font-medium">{skill}</span>
                                        <div className="flex items-center space-x-2">
                                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                                          <span className="text-xs text-orange-600">To Explore</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="projects" className="space-y-4">
                            <h4 className="font-semibold">Key Projects</h4>
                            <div className="space-y-4">
                              {candidate.projects.map((project, index) => (
                                <div key={index} className="bg-white rounded-lg border p-4">
                                  <h5 className="font-medium mb-2">{project.name}</h5>
                                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, techIndex) => (
                                      <Badge key={techIndex} variant="outline" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="notes" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Contact History</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Last Contact</span>
                                    <span className="text-sm text-gray-600">
                                      {candidate.lastContact || 'Never contacted'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Source</span>
                                    <span className="text-sm text-gray-600">{candidate.source}</span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Applied Date</span>
                                    <span className="text-sm text-gray-600">{candidate.appliedDate}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Internal Notes</h4>
                                <div className="bg-gray-50 rounded p-3 min-h-[100px]">
                                  <p className="text-sm text-gray-500">No notes yet...</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </Badge>
                </div>
                
                <p className="text-gray-600 flex items-center space-x-4 mt-1">
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {candidate.title} at {candidate.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {candidate.location}
                  </span>
                </p>
              </div>

              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Badge 
                    className={`${getMatchScoreColor(candidate.matchScore)} cursor-pointer`}
                    title={`Match Score: ${candidate.matchScore}% - ${candidate.aiInsight}`}
                  >
                    {candidate.matchScore}%
                  </Badge>
                </div>
                <Progress value={candidate.matchScore} className="w-24" />
              </div>
            </div>

            {/* AI-Generated Summary */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">{candidate.aiInsight}</p>
              </div>
            </div>

            {/* Top Matched Skills */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Top Matched Skills</h5>
              <div className="flex flex-wrap gap-1">
                {candidate.topMatchedSkills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                    onClick={() => console.log(`Filter by ${skill}`)}
                  >
                    ✓ {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span>{candidate.experience}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{candidate.availability}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{candidate.seniorityLevel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{candidate.appliedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-2 border-t opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={isShortlisted ? "default" : "outline"}
                  onClick={() => onShortlist(candidate.id)}
                  className="flex items-center space-x-1"
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-current' : ''}`} />
                  <span>Shortlist</span>
                </Button>
                
                <Button size="sm" variant="outline">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Screening
                </Button>
                
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Outreach
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Profile
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Compare
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
