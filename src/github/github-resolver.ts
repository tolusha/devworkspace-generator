/**********************************************************************
 * Copyright (c) 2022-2024
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/

import { GithubUrl } from './github-url';
import { injectable } from 'inversify';
import { Url } from '../resolve/url';
import { Resolver } from '../resolve/resolver';

@injectable()
export class GithubResolver implements Resolver {
  // eslint-disable-next-line max-len
  static readonly GITHUB_URL_PATTERN =
    /^(?<scheme>https?):\/\/(?<host>github(\..+)?\.[^\/]+)\/(?<repoUser>[^\/]+)\/(?<repoName>[^\/]+)((\/)|\/(blob|tree)\/(?<branchName>[^\/]+)(?:\/(?<subFolder>.*))?)?$/;

  isValid(url: string): boolean {
    return GithubResolver.GITHUB_URL_PATTERN.test(url);
  }

  resolve(link: string): Url {
    const match = GithubResolver.GITHUB_URL_PATTERN.exec(link);
    if (!match) {
      throw new Error(`Invalid github URL: ${link}`);
    }
    const scheme = this.getGroup(match, 'scheme');
    const hostName = this.getGroup(match, 'host');
    const repoUser = this.getGroup(match, 'repoUser');
    let repoName = this.getGroup(match, 'repoName');
    if (/^[\w-][\w.-]*?\.git$/.test(repoName)) {
      repoName = repoName.substring(0, repoName.length - 4);
    }
    const branchName = this.getGroup(match, 'branchName', 'HEAD');
    const subFolder = this.getGroup(match, 'subFolder');
    return new GithubUrl(scheme, hostName, repoUser, repoName, branchName, subFolder);
  }

  private getGroup(match: RegExpExecArray, groupName: string, defaultValue?: string) {
    if (match.groups && match.groups[groupName]) {
      return match.groups[groupName];
    }
    return defaultValue || '';
  }
}
