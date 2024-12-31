import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { MemberSelect } from './ui/MemberSelect';
import { getUserProfile, getCompanyUsers, createProject } from '../services/api';
import { User } from '../types/user';

export default function CreateProject() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Map<string, string>>(new Map());
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

  const handleMemberSelect = (userId: string, selected: boolean) => {
    const newMembers = new Map(selectedMembers);
    if (selected) {
      newMembers.set(userId, 'viewer');
    } else {
      newMembers.delete(userId);
    }
    setSelectedMembers(newMembers);
  };

  const handleRoleChange = (userId: string, role: string) => {
    setSelectedMembers(new Map(selectedMembers.set(userId, role)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMembers.size === 0) {
      toast.error('Please select at least one member');
      return;
    }

    setLoading(true);
    try {
      const profile = await getUserProfile();
      const members = Array.from(selectedMembers.entries()).map(([userId, role]) => ({
        userId,
        role,
      }));

      await createProject({
        name,
        description,
        members,
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
          className="text-white mb-6 flex items-center"
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

          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />

          <div className="space-y-2">
            <label className="text-white text-lg">Members</label>
            <div className="space-y-3">
              {users.map((user) => (
                <MemberSelect
                  key={user._id}
                  user={user}
                  selected={selectedMembers.has(user._id)}
                  role={selectedMembers.get(user._id) || 'viewer'}
                  onSelect={(selected) => handleMemberSelect(user._id, selected)}
                  onRoleChange={(role) => handleRoleChange(user._id, role)}
                />
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </form>
      </div>
    </div>
  );
}