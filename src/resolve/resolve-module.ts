/**********************************************************************
 * Copyright (c) 2022-2024
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/
import { ContainerModule, interfaces } from 'inversify';

import { GitUrlResolver } from './git-url-resolver';

const resolveModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(GitUrlResolver).toSelf().inSingletonScope();
});

export { resolveModule };
