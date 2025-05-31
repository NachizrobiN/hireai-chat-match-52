
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Workflow, Users, Clock, CheckCircle, AlertCircle, ArrowRight, Plus } from 'lucide-react';

const WorkflowManagement = () => {
  const [selectedStage, setSelectedStage] = useState('all');
  
  const [candidatesByStage, setCandidatesByStage] = useState({
    new: [
      { id: '1', name: 'Alex Thompson', title: 'Backend Engineer', daysInStage: 2, priority: 'high' },
      { id: '2', name: 'Maria Garcia', title: 'Product Designer', daysInStage: 1, priority: 'medium' }
    ],
    shortlisted: [
      { id: '3', name: 'David Kim', title: 'Frontend Developer', daysInStage: 5, priority: 'high' },
      { id: '4', name: 'Lisa Wang', title: 'Data Scientist', daysInStage: 3, priority: 'low' }
    ],
    screened: [
      { id: '5', name: 'James Wilson', title: 'DevOps Engineer', daysInStage: 7, priority: 'medium' }
    ],
    interviewing: [
      { id: '6', name: 'Sarah Chen', title: 'Senior Frontend Developer', daysInStage: 4, priority: 'high' },
      { id: '7', name: 'Michael Rodriguez', title: 'Full Stack Engineer', daysInStage: 6, priority: 'medium' }
    ],
    offer: [
      { id: '8', name: 'Emily Johnson', title: 'Frontend Developer', daysInStage: 2, priority: 'high' }
    ],
    hired: [],
    rejected: []
  });

  const [workflowStats, setWorkflowStats] = useState({
    totalCandidates: 24,
    averageDaysToHire: 28,
    bottleneckStage: 'interviewing',
    completionRate: 73
  });

  const stageNames = {
    new: 'New Applications',
    shortlisted: 'Shortlisted',
    screened: 'Pre-screened',
    interviewing: 'Interviewing',
    offer: 'Offer Extended',
    hired: 'Hired',
    rejected: 'Not Selected'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-yellow-100 text-yellow-800',
      screened: 'bg-purple-100 text-purple-800',
      interviewing: 'bg-orange-100 text-orange-800',
      offer: 'bg-green-100 text-green-800',
      hired: 'bg-green-200 text-green-900',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total in Pipeline</p>
                <p className="text-2xl font-bold">{workflowStats.totalCandidates}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Days to Hire</p>
                <p className="text-2xl font-bold">{workflowStats.averageDaysToHire}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bottleneck Stage</p>
                <p className="text-lg font-bold capitalize">{workflowStats.bottleneckStage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">{workflowStats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Workflow Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Stage Filter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Workflow className="w-5 h-5" />
                    <span>Recruitment Pipeline</span>
                  </CardTitle>
                  <CardDescription>Track candidates through each stage of your hiring process</CardDescription>
                </div>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="new">New Applications</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="screened">Pre-screened</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer Extended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>

          {/* Pipeline Stages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(candidatesByStage)
              .filter(([stage]) => selectedStage === 'all' || selectedStage === stage)
              .map(([stage, candidates]) => (
                <Card key={stage} className="h-fit">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{stageNames[stage as keyof typeof stageNames]}</h3>
                      <Badge variant="outline">{candidates.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {candidates.length === 0 ? (
                      <div className="text-center py-6 text-gray-400">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No candidates in this stage</p>
                      </div>
                    ) : (
                      candidates.map((candidate) => (
                        <div key={candidate.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-sm font-medium">{candidate.name}</h4>
                                <p className="text-xs text-gray-500">{candidate.title}</p>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(candidate.priority)} size="sm">
                              {candidate.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              {candidate.daysInStage} day{candidate.daysInStage !== 1 ? 's' : ''} in stage
                            </span>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Candidate
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Automation Rules</CardTitle>
              <CardDescription>Set up automated actions based on candidate status and timing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Auto-follow up</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send follow-up email if candidate hasn't responded in 3 days
                  </p>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Stage timeout alerts</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Alert recruiters when candidates spend >7 days in interview stage
                  </p>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Auto-reject inactive</h4>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Automatically reject candidates with no activity for 14 days
                  </p>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Interview scheduling</h4>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Auto-schedule interviews when candidates pass screening
                  </p>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance Analytics</CardTitle>
              <CardDescription>Analyze bottlenecks and optimize your hiring process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stage Conversion Rates */}
              <div>
                <h4 className="font-medium mb-4">Stage Conversion Rates</h4>
                <div className="space-y-3">
                  {[
                    { stage: 'Application → Shortlist', rate: 85, candidates: '24/28' },
                    { stage: 'Shortlist → Pre-screen', rate: 75, candidates: '18/24' },
                    { stage: 'Pre-screen → Interview', rate: 67, candidates: '12/18' },
                    { stage: 'Interview → Offer', rate: 58, candidates: '7/12' },
                    { stage: 'Offer → Hire', rate: 86, candidates: '6/7' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.stage}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{item.candidates}</span>
                        <div className="w-24">
                          <Progress value={item.rate} />
                        </div>
                        <span className="text-sm font-medium w-12">{item.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time in Each Stage */}
              <div>
                <h4 className="font-medium mb-4">Average Time in Each Stage</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { stage: 'Shortlisted', days: 3.2 },
                    { stage: 'Pre-screening', days: 5.8 },
                    { stage: 'Interviewing', days: 8.5 },
                    { stage: 'Offer', days: 2.1 }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{item.days}</div>
                      <div className="text-sm text-gray-500">days</div>
                      <div className="text-sm font-medium">{item.stage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowManagement;
