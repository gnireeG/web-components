import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/packages/flyout')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="p-4 max-w-5xl mx-auto" suppressHydrationWarning>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Fly-Out</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
                Slide-in panels that can appear from any edge of the screen with smooth animations.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                    <li>Slide in from all four directions (top, bottom, left, right)</li>
                    <li>Focus trapping with keyboard navigation support</li>
                    <li>Press ESC to close</li>
                    <li>Click outside to close (can be disabled)</li>
                    <li>Body scroll locking when open (can be disabled)</li>
                    <li>Accessible with ARIA attributes</li>
                    <li>Custom events for open/close state</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>
                <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm"><code>&lt;!-- The toggle button --&gt;
                        &lt;fly-out-toggle name="sidebar"&gt;
                        Open Sidebar
                        &lt;/fly-out-toggle&gt;

                        &lt;!-- The fly-out panel --&gt;
                        &lt;fly-out name="sidebar" position="left" className="bg-white h-screen"&gt;
                        &lt;div className="p-8"&gt;
                        &lt;h2&gt;Sidebar Content&lt;/h2&gt;
                        &lt;p&gt;Your content here&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;/fly-out&gt;

                        &lt;!-- With disabled features --&gt;
                        &lt;fly-out
                        name="modal"
                        position="bottom"
                        disable-scroll-lock
                        disable-click-outside
                        &gt;
                        Content...
                        &lt;/fly-out&gt;</code></pre>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                    Click the buttons below to open fly-outs from all four directions.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <fly-out-toggle name="demo-bottom" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors text-center" suppressHydrationWarning>
                        Open Bottom
                    </fly-out-toggle>

                    <fly-out-toggle name="demo-top" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors text-center" suppressHydrationWarning>
                        Open Top (no background)
                    </fly-out-toggle>

                    <fly-out-toggle name="demo-left" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors text-center" suppressHydrationWarning>
                        Open Left (no scroll lock)
                    </fly-out-toggle>

                    <fly-out-toggle name="demo-right" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors text-center" suppressHydrationWarning>
                        Open Right (no click outside)
                    </fly-out-toggle>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>

                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">fly-out</h3>
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden mb-6">
                    <table className="w-full">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">name</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">required</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Unique identifier for this fly-out</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">position</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">'bottom' | 'top' | 'left' | 'right'</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">'bottom'</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Edge from which the fly-out slides in</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">disable-scroll-lock</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Prevents body scroll locking when fly-out is open</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">disable-click-outside</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Prevents closing when clicking outside the fly-out</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">disable-background</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Disables the background overlay when fly-out is open</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">fly-out-toggle</h3>
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">name</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">required</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Must match the name of the fly-out to control</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Events</h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Event</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Detail</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">fly-out-opened</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">name: string</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when fly-out opens</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">fly-out-closed</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">name: string</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when fly-out closes</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">fly-out-state-changed</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">name: string, open: boolean</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when state changes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-12">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>⚠️ Note:</strong> The internal slide-in animation uses <code>transition: transform</code> on the <code>&lt;fly-out&gt;</code> element.
                        If you override the <code>transition</code> property, you'll need to manually include the fly-out animation
                        by adding <code>transform</code> to your transition (e.g., <code>transition: transform 0.2s, color 0.2s</code>).
                    </p>
                </div>
            </section>
            <fly-out name="demo-bottom" position="bottom" className="bg-white dark:bg-slate-800 w-screen shadow-2xl" suppressHydrationWarning>
                <div className="p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Bottom Fly Out</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                        This fly-out slides up from the bottom. Try pressing ESC or clicking outside to close it.
                    </p>
                    <div className="flex gap-4">
                        <input type="text" placeholder="Focus trap demo" className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                    </div>
                </div>
            </fly-out>

            <fly-out name="demo-top" disable-background position="top" className="bg-gradient-to-b from-green-600 to-green-700 w-screen shadow-2xl" suppressHydrationWarning>
                <div className="p-8 max-w-2xl mx-auto text-white">
                    <h3 className="text-2xl font-bold mb-4">Top Fly Out</h3>
                    <p className="mb-6 text-green-100">
                        This fly-out slides down from the top. Notice how the focus is trapped inside the fly-out.
                    </p>
                    <button className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 font-medium">Action Button</button>
                </div>
            </fly-out>

            <fly-out name="demo-left" disable-scroll-lock position="left" className="bg-white dark:bg-slate-800 h-screen shadow-2xl max-w-sm" suppressHydrationWarning>
                <div className="p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Left Fly Out</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                        This fly-out slides in from the left. Perfect for navigation menus or sidebars.
                    </p>
                    <nav className="space-y-2 flex-1">
                        <a href="#" className="block px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">Dashboard</a>
                        <a href="#" className="block px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">Settings</a>
                        <a href="#" className="block px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">Profile</a>
                        <a href="#" className="block px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">Logout</a>
                    </nav>
                </div>
            </fly-out>

            <fly-out name="demo-right" disable-click-outside position="right" className="bg-gradient-to-l from-purple-600 to-pink-600 h-screen shadow-2xl max-w-sm" suppressHydrationWarning>
                <div className="p-8 h-full flex flex-col text-white">
                    <h3 className="text-2xl font-bold mb-4">Right Fly Out</h3>
                    <p className="mb-6 text-purple-100">
                        This fly-out slides in from the right. Great for shopping carts, notifications, or filters.
                    </p>
                    <div className="space-y-4 flex-1">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Notification 1</h4>
                            <p className="text-sm text-purple-100">Your order has been shipped!</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Notification 2</h4>
                            <p className="text-sm text-purple-100">New message received.</p>
                        </div>
                    </div>
                    <fly-out-toggle name="demo-right" suppressHydrationWarning><button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium w-full cursor-pointer">Close</button></fly-out-toggle>
                </div>
            </fly-out>
        </div>
    )
}
