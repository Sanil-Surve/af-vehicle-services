import React, { useState } from 'react';
import { Search, User, ChevronDown, MoreHorizontal, Plus, Filter, ArrowUpDown, Eye, Edit, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Types
interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    status: 'Active' | 'Inactive';
    createdAt: string;
    orders: Order[];
    notes: string;
}

interface Order {
    id: string;
    date: string;
    amount: number;
    status: string;
}

// Dummy Data
// const DUMMY_CUSTOMERS: Customer[] = [
//     {
//         id: 'C001',
//         name: 'Alexander Morrison',
//         phone: '+1 234 567 8901',
//         email: 'alex.morrison@email.com',
//         address: '123 Oak Street, San Francisco, CA 94102',
//         status: 'Active',
//         createdAt: '2024-01-15',
//         orders: [
//             { id: 'O001', date: '2024-11-20', amount: 245.00, status: 'Delivered' },
//             { id: 'O002', date: '2024-10-15', amount: 189.50, status: 'Delivered' }
//         ],
//         notes: 'Preferred customer. Interested in premium products.'
//     },
//     {
//         id: 'C002',
//         name: 'Isabella Chen',
//         phone: '+1 234 567 8902',
//         email: 'isabella.chen@email.com',
//         address: '456 Maple Avenue, New York, NY 10001',
//         status: 'Active',
//         createdAt: '2024-02-20',
//         orders: [
//             { id: 'O003', date: '2024-11-25', amount: 320.00, status: 'Shipped' }
//         ],
//         notes: 'Fast shipping preferred.'
//     },
//     {
//         id: 'C003',
//         name: 'Marcus Thompson',
//         phone: '+1 234 567 8903',
//         email: 'marcus.t@email.com',
//         address: '789 Pine Road, Austin, TX 78701',
//         status: 'Inactive',
//         createdAt: '2024-03-10',
//         orders: [],
//         notes: 'Has not ordered in 6 months.'
//     },
//     {
//         id: 'C004',
//         name: 'Sophia Rodriguez',
//         phone: '+1 234 567 8904',
//         email: 'sophia.rod@email.com',
//         address: '321 Birch Lane, Seattle, WA 98101',
//         status: 'Active',
//         createdAt: '2024-04-05',
//         orders: [
//             { id: 'O004', date: '2024-11-28', amount: 175.25, status: 'Processing' }
//         ],
//         notes: 'Repeat customer. Excellent payment history.'
//     },
//     {
//         id: 'C005',
//         name: 'Oliver Bennett',
//         phone: '+1 234 567 8905',
//         email: 'oliver.bennett@email.com',
//         address: '654 Cedar Court, Boston, MA 02101',
//         status: 'Active',
//         createdAt: '2024-05-12',
//         orders: [
//             { id: 'O005', date: '2024-11-22', amount: 412.80, status: 'Delivered' },
//             { id: 'O006', date: '2024-10-30', amount: 298.00, status: 'Delivered' }
//         ],
//         notes: 'Corporate account. Bulk orders.'
//     }
// ];

const DUMMY_CUSTOMERS: Customer[] = [
    {
        id: 'C001',
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@example.com',
        address: 'Flat 203, Gokul Residency, Andheri West, Mumbai, Maharashtra 400053',
        status: 'Active',
        createdAt: '2024-01-15',
        orders: [
            { id: 'O001', date: '2024-11-20', amount: 245.00, status: 'Delivered' },
            { id: 'O002', date: '2024-10-15', amount: 189.50, status: 'Delivered' }
        ],
        notes: 'Regular customer. Prefers cashless payments.'
    },
    {
        id: 'C002',
        name: 'Priya Nair',
        phone: '+91 91234 56789',
        email: 'priya.nair@example.com',
        address: '12/76 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
        status: 'Active',
        createdAt: '2024-02-20',
        orders: [
            { id: 'O003', date: '2024-11-25', amount: 320.00, status: 'Shipped' }
        ],
        notes: 'Prefers fast delivery and early morning slots.'
    },
    {
        id: 'C003',
        name: 'Amit Verma',
        phone: '+91 98123 45678',
        email: 'amit.verma@example.com',
        address: 'House No. 87, Sector 22, Noida, Uttar Pradesh 201301',
        status: 'Inactive',
        createdAt: '2024-03-10',
        orders: [],
        notes: 'Has not ordered for the last 6 months.'
    },
    {
        id: 'C004',
        name: 'Sneha Patel',
        phone: '+91 90909 87654',
        email: 'sneha.patel@example.com',
        address: 'Sunshine Apartment, Satellite Road, Ahmedabad, Gujarat 380015',
        status: 'Active',
        createdAt: '2024-04-05',
        orders: [
            { id: 'O004', date: '2024-11-28', amount: 175.25, status: 'Processing' }
        ],
        notes: 'Frequent buyer. Good payment history.'
    },
    {
        id: 'C005',
        name: 'Arjun Singh',
        phone: '+91 70012 34567',
        email: 'arjun.singh@example.com',
        address: 'Sector 9, Chandigarh, 160009',
        status: 'Active',
        createdAt: '2024-05-12',
        orders: [
            { id: 'O005', date: '2024-11-22', amount: 412.80, status: 'Delivered' },
            { id: 'O006', date: '2024-10-30', amount: 298.00, status: 'Delivered' }
        ],
        notes: 'Corporate customer. Places bulk orders frequently.'
    }
];

// Sidebar Component
const Sidebar: React.FC<{ activePage: string; setActivePage: (page: string) => void }> = ({ activePage, setActivePage }) => {
    const navItems = ['Dashboard', 'Customers', 'Orders', 'Reports', 'Settings'];

    return (
        <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>Admin Portal</h1>
            </div>
            <nav className="flex-1 p-4">
                {navItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActivePage(item)}
                        className={`w-full text-left px-4 py-3 mb-2 rounded transition-colors ${activePage === item ? 'bg-white text-black' : 'hover:bg-white/10'
                            }`}
                        style={{ fontFamily: 'Noto Serif, serif' }}
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </div>
    );
};

// Header Component
const Header: React.FC = () => {
    return (
        <div className="h-16 bg-white border-b border-black/10 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-6">
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50" size={20} />
                    <Input
                        placeholder="Search customers, orders..."
                        className="pl-10 border-black/20"
                        style={{ fontFamily: 'Noto Serif, serif' }}
                    />
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2" style={{ fontFamily: 'Noto Serif, serif' }}>
                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                            <User size={18} />
                        </div>
                        <span>Admin User</span>
                        <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ fontFamily: 'Noto Serif, serif' }}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

// Customer List Page
const CustomerListPage: React.FC<{
    customers: Customer[];
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
    setActivePage: (page: string) => void;
    setSelectedCustomer: (customer: Customer | null) => void;
}> = ({ customers, setCustomers, setActivePage, setSelectedCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const itemsPerPage = 5;

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (!sortColumn) return 0;
        const aVal = a[sortColumn as keyof Customer];
        const bVal = b[sortColumn as keyof Customer];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
    const paginatedCustomers = sortedCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>Customer Management</h2>
                <Button onClick={() => setShowAddDialog(true)} style={{ fontFamily: 'Noto Serif, serif' }}>
                    <Plus size={16} className="mr-2" />
                    Add Customer
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by name, email, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                                style={{ fontFamily: 'Noto Serif, serif' }}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40" style={{ fontFamily: 'Noto Serif, serif' }}>
                                <Filter size={16} className="mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent style={{ fontFamily: 'Noto Serif, serif' }}>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full" style={{ fontFamily: 'Noto Serif, serif' }}>
                            <thead>
                                <tr className="border-b border-black/10">
                                    {['id', 'name', 'phone', 'email', 'status', 'createdAt'].map((col) => (
                                        <th
                                            key={col}
                                            className="text-left py-3 px-4 cursor-pointer hover:bg-black/5"
                                            onClick={() => handleSort(col)}
                                        >
                                            <div className="flex items-center gap-2">
                                                {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                                                <ArrowUpDown size={14} />
                                            </div>
                                        </th>
                                    ))}
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCustomers.map((customer) => (
                                    <tr key={customer.id} className="border-b border-black/5 hover:bg-black/5">
                                        <td className="py-3 px-4">{customer.id}</td>
                                        <td className="py-3 px-4 font-semibold">{customer.name}</td>
                                        <td className="py-3 px-4">{customer.phone}</td>
                                        <td className="py-3 px-4">{customer.email}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                                                {customer.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4">{customer.createdAt}</td>
                                        <td className="py-3 px-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent style={{ fontFamily: 'Noto Serif, serif' }}>
                                                    <DropdownMenuItem onClick={() => { setSelectedCustomer(customer); setActivePage('CustomerDetails'); }}>
                                                        <Eye size={14} className="mr-2" /> View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setSelectedCustomer(customer); setActivePage('EditCustomer'); }}>
                                                        <Edit size={14} className="mr-2" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(customer.id)}>
                                                        <Trash2 size={14} className="mr-2" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-black/60" style={{ fontFamily: 'Noto Serif, serif' }}>
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCustomers.length)} of {sortedCustomers.length} customers
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                style={{ fontFamily: 'Noto Serif, serif' }}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                style={{ fontFamily: 'Noto Serif, serif' }}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CustomerFormDialog
                open={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                onSave={(newCustomer) => {
                    setCustomers([...customers, { ...newCustomer, id: `C${String(customers.length + 1).padStart(3, '0')}` }]);
                    setShowAddDialog(false);
                }}
            />
        </div>
    );
};

// Customer Details Page
const CustomerDetailsPage: React.FC<{
    customer: Customer;
    setActivePage: (page: string) => void;
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}> = ({ customer, setActivePage, setCustomers }) => {
    const [notes, setNotes] = useState(customer.notes);
    const [status, setStatus] = useState(customer.status);

    const handleUpdateStatus = () => {
        setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, status, notes } : c));
        alert('Customer updated successfully');
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>Customer Details</h2>
                <Button variant="outline" onClick={() => setActivePage('Customers')} style={{ fontFamily: 'Noto Serif, serif' }}>
                    <X size={16} className="mr-2" />
                    Close
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle style={{ fontFamily: 'Noto Serif, serif' }}>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl mb-4" style={{ fontFamily: 'Noto Serif, serif' }}>
                                {customer.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Noto Serif, serif' }}>{customer.name}</h3>
                            <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className="mb-4">
                                {customer.status}
                            </Badge>
                        </div>

                        <div className="space-y-4" style={{ fontFamily: 'Noto Serif, serif' }}>
                            <div>
                                <p className="text-sm text-black/60 mb-1">Customer ID</p>
                                <p className="font-semibold">{customer.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-black/60 mb-1">Email</p>
                                <p className="font-semibold">{customer.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-black/60 mb-1">Phone</p>
                                <p className="font-semibold">{customer.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-black/60 mb-1">Address</p>
                                <p className="font-semibold">{customer.address}</p>
                            </div>
                            <div>
                                <p className="text-sm text-black/60 mb-1">Member Since</p>
                                <p className="font-semibold">{customer.createdAt}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Select value={status} onValueChange={(val: 'Active' | 'Inactive') => setStatus(val)}>
                                <SelectTrigger style={{ fontFamily: 'Noto Serif, serif' }}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent style={{ fontFamily: 'Noto Serif, serif' }}>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleUpdateStatus} className="w-full" style={{ fontFamily: 'Noto Serif, serif' }}>
                                Update Status
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle style={{ fontFamily: 'Noto Serif, serif' }}>Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {customer.orders.length > 0 ? (
                                <div className="space-y-4">
                                    {customer.orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 border border-black/10 rounded" style={{ fontFamily: 'Noto Serif, serif' }}>
                                            <div>
                                                <p className="font-semibold">{order.id}</p>
                                                <p className="text-sm text-black/60">{order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${order.amount.toFixed(2)}</p>
                                                <Badge variant="outline">{order.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-black/60 text-center py-8" style={{ fontFamily: 'Noto Serif, serif' }}>No orders found</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle style={{ fontFamily: 'Noto Serif, serif' }}>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full min-h-32 p-3 border border-black/20 rounded resize-none focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Add notes about this customer..."
                                style={{ fontFamily: 'Noto Serif, serif' }}
                            />
                            <Button onClick={handleUpdateStatus} className="mt-3" style={{ fontFamily: 'Noto Serif, serif' }}>
                                Save Notes
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Customer Form Dialog
const CustomerFormDialog: React.FC<{
    open: boolean;
    onClose: () => void;
    onSave: (customer: Omit<Customer, 'id'>) => void;
    initialData?: Customer;
}> = ({ open, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
        address: initialData?.address || '',
        status: initialData?.status || 'Active',
        createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
        orders: initialData?.orders || [],
        notes: initialData?.notes || ''
    });

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.phone && formData.address) {
            onSave(formData);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl" style={{ fontFamily: 'Noto Serif, serif' }}>
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Phone</label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Email</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Address</label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Status</label>
                            <Select value={formData.status} onValueChange={(val: 'Active' | 'Inactive') => setFormData({ ...formData, status: val })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {initialData ? 'Update' : 'Create'} Customer
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Edit Customer Page
const EditCustomerPage: React.FC<{
    customer: Customer;
    setActivePage: (page: string) => void;
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}> = ({ customer, setActivePage, setCustomers }) => {
    const handleSave = (updatedCustomer: Omit<Customer, 'id'>) => {
        setCustomers(prev => prev.map(c => c.id === customer.id ? { ...updatedCustomer, id: customer.id } : c));
        setActivePage('Customers');
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>Edit Customer</h2>
                <Button variant="outline" onClick={() => setActivePage('Customers')} style={{ fontFamily: 'Noto Serif, serif' }}>
                    Cancel
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <CustomerFormDialog
                        open={true}
                        onClose={() => setActivePage('Customers')}
                        onSave={handleSave}
                        initialData={customer}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

// Main App
const Admin: React.FC = () => {
    const [activePage, setActivePage] = useState('Customers');
    const [customers, setCustomers] = useState<Customer[]>(DUMMY_CUSTOMERS);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'Noto Serif, serif' }}>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&display=swap" rel="stylesheet" />

            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <Header />

            <main className="ml-64 mt-16 p-8">
                {activePage === 'Customers' && (
                    <CustomerListPage
                        customers={customers}
                        setCustomers={setCustomers}
                        setActivePage={setActivePage}
                        setSelectedCustomer={setSelectedCustomer}
                    />
                )}
                {activePage === 'CustomerDetails' && selectedCustomer && (
                    <CustomerDetailsPage
                        customer={selectedCustomer}
                        setActivePage={setActivePage}
                        setCustomers={setCustomers}
                    />
                )}
                {activePage === 'EditCustomer' && selectedCustomer && (
                    <EditCustomerPage
                        customer={selectedCustomer}
                        setActivePage={setActivePage}
                        setCustomers={setCustomers}
                    />
                )}
                {!['Customers', 'CustomerDetails', 'EditCustomer'].includes(activePage) && (
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">{activePage}</h2>
                            <p className="text-black/60">This page is under construction</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;