import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="logo">
                    <h2>Tribesman Admin</h2>
                </div>
                <ul className="admin-menu">
                    <li><Link to="/admin"><i className="fas fa-home"></i> Dashboard</Link></li>
                    <li><Link to="/admin/products"><i className="fas fa-tshirt"></i> Products</Link></li>
                    <li><Link to="/admin/categories"><i className="fas fa-tags"></i> Categories</Link></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h2>Administration Panel</h2>
                    <div className="user-profile">
                        <span>Admin User</span>
                    </div>
                </header>
                <div className="admin-body">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
