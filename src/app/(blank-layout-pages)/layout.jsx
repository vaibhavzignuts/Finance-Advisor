// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import PublicRoute from '@/routes/PublicRoute'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

const Layout = ({ children }) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <PublicRoute>
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </PublicRoute>
    </Providers>
  )
}

export default Layout
