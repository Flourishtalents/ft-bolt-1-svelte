<script lang="ts">
  import { currentRoute } from './stores/router';
  import Layout from '../routes/+layout.svelte';
  import Home from '../routes/+page.svelte';
  import AuthLayout from '../routes/auth/+layout.svelte';
  import Login from '../routes/auth/login/+page.svelte';
  import Register from '../routes/auth/register/+page.svelte';
  import ClientDashboard from '../routes/client/dashboard/+page.svelte';
  import CommunityClub from '../routes/community/club/+page.svelte';
  import CommunityMerchandise from '../routes/community/merchandise/+page.svelte';
  import TalentDiscovery from '../routes/talent/discovery/+page.svelte';
  import TalentMasterclass from '../routes/talent/masterclass/+page.svelte';
  import TalentPortfolio from '../routes/talent/portfolio/+page.svelte';

  $: route = $currentRoute;

  function getComponent(path: string) {
    switch (path) {
      case '/':
        return { component: Home, layout: Layout };
      case '/auth/login':
        return { component: Login, layout: AuthLayout };
      case '/auth/register':
        return { component: Register, layout: AuthLayout };
      case '/client/dashboard':
        return { component: ClientDashboard, layout: Layout };
      case '/community/club':
        return { component: CommunityClub, layout: Layout };
      case '/community/merchandise':
        return { component: CommunityMerchandise, layout: Layout };
      case '/talent/discovery':
        return { component: TalentDiscovery, layout: Layout };
      case '/talent/masterclass':
        return { component: TalentMasterclass, layout: Layout };
      case '/talent/portfolio':
        return { component: TalentPortfolio, layout: Layout };
      default:
        return { component: Home, layout: Layout };
    }
  }

  $: currentComponent = getComponent(route);
</script>

<svelte:component this={currentComponent.layout}>
  <svelte:component this={currentComponent.component} />
</svelte:component>
