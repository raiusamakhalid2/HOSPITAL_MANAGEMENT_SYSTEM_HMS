import { useContext } from 'react';
import { Navigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

export const USER_TYPES = {
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  PATIENT: 'Patient',
};

export function PatientElement({ children }) {
  const { user } = useContext(AuthContext);

  if (user && user.Access_Type === USER_TYPES.PATIENT) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  }

}

export function AdminElement({ children }) {
  const { user } = useContext(AuthContext);

  if (user && user.Access_Type === USER_TYPES.ADMIN) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace={true} />;
    }


}
  

  export function DoctorElement({ children }) {
    const { user } = useContext(AuthContext);
    

      if (user && user.Access_Type === USER_TYPES.DOCTOR) {
        return <>{children}</>;
      } else {
        return <Navigate to="/login" replace={true} />;
      }
  }
  

