import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { 
  Users, Database, Settings, Shield, 
  ChevronDown, ChevronUp, Search, RefreshCw 
} from 'lucide-react';

// Mock data for admin dashboard
const mockUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', role: 'user', created: '2023-05-12' },
  { id: 2, username: 'user2', email: 'user2@example.com', role: 'user', created: '2023-06-15' },
  { id: 3, username: 'admin', email: 'admin@example.com', role: 'admin', created: '2023-04-10' },
  { id: 4, username: 'user3', email: 'user3@example.com', role: 'user', created: '2023-07-22' },
];

const mockCharacters = [
  { id: 1, name: 'Thorne', user: 'user1', heritage: 'Human', calling: 'Warrior', level: 5 },
  { id: 2, name: 'Elara', user: 'user2', heritage: 'Elf', calling: 'Mage', level: 3 },
  { id: 3, name: 'Grimm', user: 'user1', heritage: 'Dwarf', calling: 'Cleric', level: 4 },
  { id: 4, name: 'Lyra', user: 'user3', heritage: 'Halfling', calling: 'Rogue', level: 2 },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('users');
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Stats for dashboard overview
  const stats = [
    { 
      title: 'Users', 
      value: mockUsers.length, 
      icon: <Users className="h-8 w-8" />,
      color: 'bg-blue-500',
    },
    { 
      title: 'Characters', 
      value: mockCharacters.length, 
      icon: <Shield className="h-8 w-8" />,
      color: 'bg-green-500',
    },
    { 
      title: 'Database Size', 
      value: '24 MB', 
      icon: <Database className="h-8 w-8" />,
      color: 'bg-purple-500',
    },
    { 
      title: 'System Status', 
      value: 'Online', 
      icon: <Settings className="h-8 w-8" />,
      color: 'bg-amber-500',
    },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-display font-bold text-primary-700">Admin Dashboard</h1>
          <Button variant="outline" icon={<RefreshCw className="h-4 w-4" />}>
            Refresh Data
          </Button>
        </div>
        
        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-neutral-200 mb-6">
          <button 
            className={`px-4 py-3 font-medium ${
              activeTab === 'overview' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-neutral-600 hover:text-primary-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-3 font-medium ${
              activeTab === 'users' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-neutral-600 hover:text-primary-500'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`px-4 py-3 font-medium ${
              activeTab === 'characters' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-neutral-600 hover:text-primary-500'
            }`}
            onClick={() => setActiveTab('characters')}
          >
            Characters
          </button>
          <button 
            className={`px-4 py-3 font-medium ${
              activeTab === 'settings' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-neutral-600 hover:text-primary-500'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <div className="flex items-center">
                    <div className={`p-4 rounded-lg ${stat.color} text-white mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-600">{stat.title}</h3>
                      <p className="text-2xl font-bold text-primary-700">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Recent Activity */}
            <div className="mb-8">
              <div 
                className="flex justify-between items-center p-4 bg-white rounded-t-lg shadow cursor-pointer"
                onClick={() => toggleSection('users')}
              >
                <h2 className="text-xl font-display font-bold text-primary-600">Recent Users</h2>
                {expandedSection === 'users' ? (
                  <ChevronUp className="h-5 w-5 text-primary-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary-500" />
                )}
              </div>
              
              {expandedSection === 'users' && (
                <div className="bg-white rounded-b-lg shadow overflow-hidden">
                  <div className="p-4 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                        <input 
                          type="text" 
                          placeholder="Search users..." 
                          className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <Link to="/admin/users">
                        <Button variant="outline" size="sm">
                          View All Users
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Username</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {mockUsers.map(user => (
                          <tr key={user.id} className="hover:bg-neutral-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{user.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-neutral-900">{user.username}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{user.email}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{user.created}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recent Characters */}
            <div>
              <div 
                className="flex justify-between items-center p-4 bg-white rounded-t-lg shadow cursor-pointer"
                onClick={() => toggleSection('characters')}
              >
                <h2 className="text-xl font-display font-bold text-primary-600">Recent Characters</h2>
                {expandedSection === 'characters' ? (
                  <ChevronUp className="h-5 w-5 text-primary-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary-500" />
                )}
              </div>
              
              {expandedSection === 'characters' && (
                <div className="bg-white rounded-b-lg shadow overflow-hidden">
                  <div className="p-4 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                        <input 
                          type="text" 
                          placeholder="Search characters..." 
                          className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <Link to="/admin/characters">
                        <Button variant="outline" size="sm">
                          View All Characters
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Heritage</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Calling</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Level</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {mockCharacters.map(character => (
                          <tr key={character.id} className="hover:bg-neutral-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{character.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-neutral-900">{character.name}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{character.user}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{character.heritage}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{character.calling}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-800">
                                Level {character.level}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <p className="text-neutral-600 mb-4">Full user management coming soon.</p>
          </div>
        )}
        
        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div>
            <p className="text-neutral-600 mb-4">Full character management coming soon.</p>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <p className="text-neutral-600 mb-4">System settings coming soon.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;