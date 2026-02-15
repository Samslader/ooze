import path from 'path';
import { ConfigRule } from './ConfigManager';

export class ConfigBuilder {
  private binPath: string;
  private listsPath: string;
  private gameFilter: string;

  constructor(resourcesPath: string, gameFilterEnabled: boolean = false) {
    this.binPath = path.join(resourcesPath, 'zapret', 'bin');
    this.listsPath = path.join(resourcesPath, 'zapret', 'lists');
    this.gameFilter = gameFilterEnabled ? '1024-65535' : '12';
  }

  buildArgs(rules: ConfigRule[]): string[] {
    const args: string[] = [];

    // Build wf-tcp and wf-udp from all rules
    const tcpPorts = new Set<string>();
    const udpPorts = new Set<string>();

    rules.forEach(rule => {
      if (rule.filterTcp) {
        rule.filterTcp.split(',').forEach(p => tcpPorts.add(p));
      }
      if (rule.filterUdp) {
        rule.filterUdp.split(',').forEach(p => udpPorts.add(p));
      }
    });

    // Add game filter to ports
    if (tcpPorts.size > 0) {
      args.push(`--wf-tcp=${Array.from(tcpPorts).join(',')},${this.gameFilter}`);
    }
    if (udpPorts.size > 0) {
      args.push(`--wf-udp=${Array.from(udpPorts).join(',')},${this.gameFilter}`);
    }

    // Build each rule
    rules.forEach((rule, index) => {
      const ruleArgs = this.buildRuleArgs(rule);
      args.push(...ruleArgs);
      
      // Add --new separator except for last rule
      if (index < rules.length - 1) {
        args.push('--new');
      }
    });

    return args;
  }

  private buildRuleArgs(rule: ConfigRule): string[] {
    const args: string[] = [];

    // Filters
    if (rule.filterTcp) {
      const ports = rule.filterTcp.includes('GameFilter') 
        ? rule.filterTcp.replace('GameFilter', this.gameFilter)
        : rule.filterTcp;
      args.push(`--filter-tcp=${ports}`);
    }

    if (rule.filterUdp) {
      const ports = rule.filterUdp.includes('GameFilter')
        ? rule.filterUdp.replace('GameFilter', this.gameFilter)
        : rule.filterUdp;
      args.push(`--filter-udp=${ports}`);
    }

    if (rule.filterL7) {
      args.push(`--filter-l7=${rule.filterL7}`);
    }

    // Hostlists
    if (rule.hostlist) {
      args.push(`--hostlist="${path.join(this.listsPath, rule.hostlist)}"`);
    }

    if (rule.hostlistDomains) {
      args.push(`--hostlist-domains=${rule.hostlistDomains}`);
    }

    if (rule.hostlistExclude) {
      args.push(`--hostlist-exclude="${path.join(this.listsPath, rule.hostlistExclude)}"`);
    }

    // IPSets
    if (rule.ipset) {
      args.push(`--ipset="${path.join(this.listsPath, rule.ipset)}"`);
    }

    if (rule.ipsetExclude) {
      args.push(`--ipset-exclude="${path.join(this.listsPath, rule.ipsetExclude)}"`);
    }

    // IP ID
    if (rule.ipId) {
      args.push(`--ip-id=${rule.ipId}`);
    }

    // DPI Desync
    if (rule.dpiDesync) {
      args.push(`--dpi-desync=${rule.dpiDesync}`);
    }

    if (rule.dpiDesyncRepeats) {
      args.push(`--dpi-desync-repeats=${rule.dpiDesyncRepeats}`);
    }

    if (rule.dpiDesyncFakeTls) {
      const tlsPath = path.join(this.binPath, rule.dpiDesyncFakeTls);
      args.push(`--dpi-desync-fake-tls="${tlsPath}"`);
    }

    if (rule.dpiDesyncFakeQuic) {
      const quicPath = path.join(this.binPath, rule.dpiDesyncFakeQuic);
      args.push(`--dpi-desync-fake-quic="${quicPath}"`);
    }

    if (rule.dpiDesyncSplitPos !== undefined) {
      args.push(`--dpi-desync-split-pos=${rule.dpiDesyncSplitPos}`);
    }

    if (rule.dpiDesyncSplitSeqovl !== undefined) {
      args.push(`--dpi-desync-split-seqovl=${rule.dpiDesyncSplitSeqovl}`);
    }

    if (rule.dpiDesyncSplitSeqovlPattern) {
      const patternPath = path.join(this.binPath, rule.dpiDesyncSplitSeqovlPattern);
      args.push(`--dpi-desync-split-seqovl-pattern="${patternPath}"`);
    }

    if (rule.dpiDesyncFooling) {
      args.push(`--dpi-desync-fooling=${rule.dpiDesyncFooling}`);
    }

    if (rule.dpiDesyncAutottl !== undefined) {
      args.push(`--dpi-desync-autottl=${rule.dpiDesyncAutottl}`);
    }

    if (rule.dpiDesyncAnyProtocol !== undefined) {
      args.push(`--dpi-desync-any-protocol=${rule.dpiDesyncAnyProtocol}`);
    }

    if (rule.dpiDesyncCutoff) {
      args.push(`--dpi-desync-cutoff=${rule.dpiDesyncCutoff}`);
    }

    return args;
  }
}
