import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function Dashboard({ children }: { children?: ReactNode | ReactNode[] }) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}