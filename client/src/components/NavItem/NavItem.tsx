interface Props {
	children: React.ReactNode;
	className?: string;
}

function NavItem({ children, className }: Props) {
	return (
		<li data-testid="nav-item" className={`nav-item ${className}`}>
			{children}
		</li>
	);
}

export default NavItem;
