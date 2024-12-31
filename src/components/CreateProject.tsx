import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from './ui/Input';
import { StatusDropdown } from './ui/StatusDropdown';
import { MemberDropdown } from './ui/MemberDropdown';
import { Button } from './ui/Button';
import { getUserProfile, getCompanyUsers, createProject } from '../services/api';
import { User } from '../types/user';

interface Member {
  userId: string;
  role: string;
}

export default function CreateProject() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const profile = await getUserProfile();
        const companyUsers = await getCompanyUsers(profile.companyId);
        setUsers(companyUsers);
      } catch (error: any) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member');
      return;
    }

    setLoading(true);
    try {
      const profile = await getUserProfile();
      await createProject({
        name,
        description,
        members: selectedMembers,
        ownerId: profile._id,
        status,
      });

      toast.success('Project created successfully');
      navigate('/projects');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/projects')}
          className="text-white mb-6 flex items-center hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Projects
        </button>

        <h1 className="text-white text-3xl font-bold mb-8">Create Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            required
          />

          <StatusDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />

          <MemberDropdown
            label="Members"
            users={users}
            selectedMembers={selectedMembers}
            onChange={setSelectedMembers}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </form>
      </div>
    </div>
  );
}