import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, LogOut, RefreshCw, Trash2, Eye, EyeOff } from 'lucide-react';

const Admin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Check session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Fetch contacts (only when logged in)
  useEffect(() => {
    if (session) fetchContacts();
  }, [session]);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching:', error);
    } else {
      setContacts(data);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) {
      alert('Error deleting');
    } else {
      fetchContacts();
    }
  };

  // ===== LOGIN SCREEN =====
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>
          <p className="text-sm text-gray-400 text-center mb-6">LMR Constrtech Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                placeholder="admin@lmrconstrtech.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 px-4 py-3 font-semibold text-gray-950 hover:bg-amber-400 transition flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <LogIn size={18} />}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== DASHBOARD =====
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Enquiries Dashboard</h1>
            <p className="text-sm text-gray-400">{contacts.length} total enquiries</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-amber-500 hover:border-amber-500/50 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-gray-800 border border-gray-700 p-4">
            <p className="text-xs text-gray-400">Total Enquiries</p>
            <p className="text-2xl font-bold text-white">{contacts.length}</p>
          </div>
          <div className="rounded-xl bg-gray-800 border border-gray-700 p-4">
            <p className="text-xs text-gray-400">Today</p>
            <p className="text-2xl font-bold text-amber-500">
              {contacts.filter(c => new Date(c.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-gray-800 border border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Phone</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Project</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Date</th>
                <th className="text-right px-4 py-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{c.phone}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-500 border border-amber-500/20">
                      {c.project || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(c.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedContact(c)}
                        className="rounded-lg p-1.5 text-gray-400 hover:text-amber-500 transition"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="rounded-lg p-1.5 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">No enquiries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-gray-800 border border-gray-700 p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Enquiry Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-400">Name:</span> <span className="text-white">{selectedContact.name}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white">{selectedContact.email}</span></div>
              <div><span className="text-gray-400">Phone:</span> <span className="text-white">{selectedContact.phone}</span></div>
              <div><span className="text-gray-400">Project:</span> <span className="text-white">{selectedContact.project}</span></div>
              <div><span className="text-gray-400">Message:</span> <p className="text-white mt-1">{selectedContact.message || 'No message'}</p></div>
            </div>
            <button onClick={() => setSelectedContact(null)} className="mt-6 w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-gray-950 hover:bg-amber-400 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;