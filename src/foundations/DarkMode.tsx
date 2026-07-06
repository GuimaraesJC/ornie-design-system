import { Avatar } from '../components/Avatar/Avatar';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Switch } from '../components/Switch/Switch';
import { Tabs } from '../components/Tabs/Tabs';

export interface DarkModeProps {}

/**
 * Riverbed at night. Everything inside this card runs under
 * data-ornie-theme="dark" — the attribute is the whole mechanism: put it on
 * your page root (or any subtree) and every component re-themes through the
 * Layer 2 tokens. Same components, same props, lights down.
 */
export function DarkMode(_props: DarkModeProps) {
  return (
    <div data-ornie-theme="dark" className="ornie-app ornie-foundation-dark">
      <div className="ornie-foundation-dark__row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 'var(--ornie-text-xl)', fontWeight: 'var(--ornie-weight-bold)' }}>
            Riverbed at night
          </div>
          <div style={{ color: 'var(--ornie-text-muted)', fontSize: 'var(--ornie-text-sm)' }}>
            Enabled with data-ornie-theme=&quot;dark&quot; on any root — no component changes.
          </div>
        </div>
        <Badge variant="accent">dark</Badge>
      </div>

      <div className="ornie-foundation-dark__row">
        <Button>Get started</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
        <Button loading>Loading</Button>
      </div>

      <div className="ornie-foundation-dark__grid">
        <Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
        <Select
          label="Plan"
          options={[
            { value: 'starter', label: 'Starter — free' },
            { value: 'pro', label: 'Pro — $12/month' },
          ]}
          defaultValue="pro"
        />
      </div>

      <Card variant="elevated" padding="md">
        <div className="ornie-foundation-dark__row" style={{ justifyContent: 'space-between' }}>
          <div className="ornie-foundation-dark__row">
            <Avatar name="Jean Guimarães" />
            <div>
              <div style={{ fontWeight: 'var(--ornie-weight-semibold)' }}>Jean Guimarães</div>
              <div style={{ color: 'var(--ornie-text-muted)', fontSize: 'var(--ornie-text-sm)' }}>
                Product designer
              </div>
            </div>
          </div>
          <Badge variant="success" dot>
            Online
          </Badge>
        </div>
      </Card>

      <div className="ornie-foundation-dark__row" style={{ gap: 'var(--ornie-space-6)' }}>
        <Switch label="Notifications" defaultChecked />
        <Checkbox label="Weekly digest" defaultChecked />
        <Badge variant="warning" dot>
          Pending
        </Badge>
        <div className="ornie-foundation-dark__row" style={{ gap: 'var(--ornie-space-2)' }}>
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Grace Hopper" size="sm" />
          <Avatar name="Alan Turing" size="sm" />
          <Avatar name="Katherine Johnson" size="sm" />
          <Avatar name="Edsger Dijkstra" size="sm" />
        </div>
      </div>

      <Tabs
        items={[
          { label: 'Overview', content: 'A quick summary of your project: recent activity and health checks.' },
          { label: 'Analytics', content: 'Traffic sources and weekly trends live here.' },
          { label: 'Settings' },
        ]}
      />
    </div>
  );
}
