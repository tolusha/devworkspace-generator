/**********************************************************************
 * Copyright (c) 2022-2024
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/

import { Url } from '../resolve/url';

export class GithubUrl implements Url {
  constructor(
    private readonly scheme: string,
    private readonly hostName: string,
    private readonly repoUser: string,
    private readonly repoName: string,
    private readonly branchName: string,
    private readonly subFolder: string
  ) {}

  /**
   * Provides the raw link to the given path based on the current repository information
   */
  getContentUrl(path: string): string {
    const hostName = this.hostName === 'github.com' ? 'githubusercontent.com' : this.hostName;
    return `${this.scheme}://raw.${hostName}/${this.repoUser}/${this.repoName}/${this.branchName}/${path}`;
  }

  getUrl(): string {
    return `${this.scheme}://${this.hostName}/${this.repoUser}/${this.repoName}/tree/${this.branchName}/${this.subFolder}`;
  }

  getCloneUrl(): string {
    return `${this.scheme}://${this.hostName}/${this.repoUser}/${this.repoName}.git`;
  }

  getRepoName(): string {
    return this.repoName;
  }

  getBranchName(): string {
    return this.branchName;
  }
}
